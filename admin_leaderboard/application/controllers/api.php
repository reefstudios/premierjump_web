<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class API extends REST_Controller {

	function __construct()
	{
		parent::__construct();
        $this->load->library('ion_auth');
        $this->_getOptions();
        $this->_postOptions();
		$this->load->library('form_validation');
		$this->load->helper('url');
		$this->load->helper('language');
        $this->load->model('main_m');
		
		$this->form_validation->set_error_delimiters(
			$this->config->item('error_start_delimiter'), 
			$this->config->item('error_end_delimiter')
		);
	}
    private function _getOptions(){
        $this->_option = $this->db->escape_str($this->get('option'));
        $this->_token = $this->db->escape_str($this->get('token'));
        $this->_qid = $this->db->escape_str($this->get('qid'));
        $this->_status = $this->db->escape_str($this->get('status'));
        $this->_name = $this->get('name');
        $this->_password = $this->get('password');
        $this->_answered = $this->get('answered');
        
        //leaderboard
        $this->_name = $this->get('name');
        $this->_region = $this->get('region');
        $this->_score = $this->get('score');
        $this->_usertype = $this->get('usertype');
        $this->_level = $this->get('level');
        
        //games
        $this->_isend = 0;
        $this->_gameid = $this->get('gameid');
    }
    private function _postOptions(){
        $this->_option = $this->db->escape_str($this->post('option'));
        $this->_token = $this->db->escape_str($this->post('token'));
        $this->_qid = $this->db->escape_str($this->post('qid'));
        $this->_status = $this->db->escape_str($this->post('status'));
        $this->_name = $this->post('name');
        $this->_password = $this->post('password');
        $this->_answered = $this->post('answered');
        
        //leaderboard
        $this->_name = $this->post('name');
        $this->_region = $this->post('region');
        $this->_score = $this->post('score');
        $this->_usertype = $this->post('usertype');
        $this->_level = $this->post('level');
        
        //games
        $this->_isend = 0;
        $this->_gameid = $this->post('gameid');
    }

    private function _insertToken($user_id, $token){
        $sql = array('user_id'=>$user_id, 'token'=>$token);
        $this->db->where('user_id', $user_id);
        
        if($this->db->update('msp_token', $sql) && !$this->db->affected_rows()){
            $this->db->insert('msp_token', $sql);
        }
    }
    
    private function _createToken(){
        $len = rand(1,1000);
        $token = md5(time().$len);
        $query = $this->db->query("select * from msp_token where token='{$token}'");
        $row = $query->result();
        if($row){
            $token = $this->_createToken();
        }
        return $token;
    }
    
    private function _createGameID(){
        $len = rand(1000,5000);
        $gameid = md5(time().$len);
        $query = $this->db->query("select * from msp_games where gameid='{$gameid}'");
        $games = $query->result();
        if(count($games)>2){
            $gameid = $this->_createGameID();
        }
        return $gameid;
    }
    
    private function _checkToken(){
        if($this->_option == "login"){
            return true;
        }
        if(!$this->_token)
            return false;
        $query = $this->db->query("
            select t1.token, t2.* 
            from msp_token t1 join users t2 on t1.user_id=t2.id
            where 
                t1.token='{$this->_token}'
        ");
        $user = $query->row_object();
        if(is_object($user)){
            return $user;
        }else{
            return false;
        }
    }
    
    public function index_get()
    {
        $option = $this->_option;
        call_user_func_array(array($this, "response_{$option}"), array());
    }
    public function index_post()
    {
    	
        $option = $this->_option;
        call_user_func_array(array($this, "response_{$option}"), array());
    }    
    public function response_all(){
        $questions = $this->main_m->get_question_list();
        $answers = $this->main_m->get_answer_list();
        $result = array();
        foreach($questions as $v1){
        	if($v1->on_off){
	            $question = array();
	            $question['text'] = stripslashes($v1->name);
	            $question['qid'] = $v1->id;
	            //$question['status'] = $v1->status;
	           // $question['answered'] = $v1->answered;
	            $question['answers'] = array();
	            foreach($answers as $v2){
	                if($v1->id == $v2->qid){
	                    $answer = array();
	                    $answer['id'] = $v2->id;
	                    $answer['answer'] = stripslashes($v2->name);
	                    $answer['is_correct'] = intval($v2->is_correct);
	                    $question['answers'][] = $answer;
	                }
	            }
	            $result[] = $question;
	        }
        }
//        answered
        $this->response($result);
    }
    
    
    public function response_insert_status(){
//        $sql = array('user_id'=>$user_id, 'token'=>$token);
        $sql = array('qid'=>$this->_qid, 'status'=>$this->_status, 'user_id'=>0, 'answered'=>$this->_answered, 'time_stamp'=>time());
//        $this->db->where('user_id', $this->_user->id);
//        $this->db->where('qid', $this->_qid);
//        
//        $this->db->delete('msp_status');
        $this->db->insert('msp_status', $sql);

        $result['result'] = "success";
        $this->response($result);
    }
    
    public function response_login(){
        $this->load->library('ion_auth');
        $result = array();
        if($this->ion_auth->login($this->_name, $this->_password)){
            $user_id = $this->ion_auth->get_user_id();
            $token = $this->_createToken();
            $result['result'] = "1";
            $result['token'] = $token;
            $this->_insertToken($user_id, $token);
        }else{
            $result['result'] = "0";
        }
        $this->response($result);
    }
    public function response_game_setting(){
    	$result = $this->main_m->get_settings_values();
    	$this->response($result);
    }
    public function response_insert_highscore(){
        $sql = array(
            'user_name' => $this->_name,
            'region' => $this->_region,
            'score' => $this->_score,
            'usertype' => $this->_usertype,
            'level' => $this->_level,
            'time_stamp' => time()
        );
        $result = array();
        foreach($sql as $key=>$value){
            if(!$value)
            {
                $result['result'] = "failure";
                $result['error'] = ucfirst($key)." is required.";
                $this->response($result);
            }
        }
        $this->db->insert('msp_highscore', $sql);
        $result['result'] = "success";
        $this->response($result);
    }
    
    public function response_get_leaderboard(){
        $rows = $this->main_m->getLeaderboard($this->_usertype, $this->_level);
        $rows ? $result=$rows : $result['result']="Empty";
        $this->response($result);
    }
    
    private function _isValidGameid(){
        if(!$this->_gameid){
            $this->_isend = 0;
            $this->_gameid = $this->_createGameID();
            return false;
        }
        $query = $this->db->query("select * from msp_games where gameid='{$this->_gameid}' and isend=0");
        $startGame = $query->row_object();
//        print_r("select * from msp_games where gameid='{$this->_gameid}' and isend=0");exit;
        if(!$startGame || (time()-$startGame->time_stamp)>60*30){
//        echo time()-$startGame->time_stamp;exit;
            $this->_isend = 0;
            $this->_gameid = $this->_createGameID();
            return false;
        }
        $query = $this->db->query("select * from msp_games where gameid='{$this->_gameid}' and isend=1");
        $endGame = $query->row_object();
        if(!$endGame){
            $this->_isend = 1;
            return true;
        }
        if((time() - $endGame->time_stamp)>60*30){
            $this->_isend = 0;
            $this->_gameid = $this->_createGameID();
            return false;
        }else{
            $this->_isend = 1;
            return true;
        }
    }
    
    public function response_insert_games(){
        $this->_isValidGameid();
        $sql = array(
            'user_id' => 0,
            'region' => $this->_region,
            'usertype' => $this->_usertype ? $this->_usertype : 1 ,
            'level' => $this->_level ? $this->_level : 1,
            'isend' => $this->_isend,
            'gameid' => $this->_gameid ? $this->_gameid : $this->_createToken(),
            'time_stamp' => time()
        );
        $this->db->where('gameid', $this->_gameid);
        $this->db->where('isend', $this->_isend);
        $this->db->delete('msp_games');
        $this->db->insert('msp_games', $sql);
        $result['result'] = "success";
        $result['gameid'] = $this->_gameid;
        $this->response($result);
    }
    
}

/* End of file main.php */
/* Location: ./application/controllers/main.php */