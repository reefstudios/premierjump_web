<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Main_m extends CI_Model
{
	public function __construct()
	{
        $this->errors = array();
		parent::__construct();
	//	$this->load->database();
	}
    /**
     * errors as array
     *
     * Get the error messages as an array
     *
     * @return array
     * @author Raul Baldner Junior
     **/
    public function get_errors()
    {
        return $this->errors;
    }
	
    public function get_question_list($sort_str="") {
        $strSql = "SELECT t1.*,(t2.success_count/t3.total_count*100) as answered_percent FROM msp_question as t1 left join
                    (
            		 select qid,count(id) as success_count
	                 from msp_status
	                 where status=1
	                 group by qid
    				) as t2 on t1.id=t2.qid left join
                    (
            		 select qid,count(id) as total_count
	                 from msp_status
	                 group by qid
    				) as t3 on t1.id=t3.qid
        ";
            if(trim($sort_str) != ""){
            	$strSql .=" ORDER BY ".$sort_str;
            }
//        if($sort_flag){
//        	$strSql .= " ORDER BY answered_percent DESC";
//        }else{
//        	$strSql .= " ORDER BY answered_percent ASC";
//        }
        $query = $this->db->query($strSql);
        $rows = $query->result();
        return $rows;
    }
    public function clearQuestionStatus(){
    	$sql = "DELETE FROM msp_status";
		return  $this->db->query($sql);
    }
	public function get_settings_values(){
		$strSql = "SELECT * FROM settings";
        $query = $this->db->query($strSql);
        $rows = $query->result();
        $data = array();
        foreach($rows as $row){
        	$data[$row->field] = $row->value;
        }
        return $data;
	}
    public function get_question_list_from_user($user_id){
        $strSql = "SELECT t1.*, if(ISNULL(t3.status),if(ISNULL(t2.status),'lock','failure'),'success') status, ifnull(t3.answered,'') answered
            FROM msp_question t1 left join 
                (
                    select user_id , qid, answered, status
                    from msp_status
                    where status=0
                    group by user_id, qid
                ) t2 on t1.id=t2.qid and t2.user_id = '{$user_id}' left join
                (
                    select user_id , qid,  answered, status
                    from msp_status
                    where status=1
                    group by user_id, qid
                ) t3 on t1.id=t3.qid and t3.user_id = '{$user_id}' 
                
        ";
        $query = $this->db->query($strSql);
        $rows = $query->result();
        return $rows;
    }
    
	public function get_answer_list() {
		$strSql = "
            SELECT t1.*, t2.name question 
            FROM msp_answer t1, msp_question t2
            where 
                t1.qid = t2.id
        ";
		$query = $this->db->query($strSql);
		$rows = $query->result();
		return $rows;
	}
    
    public function get_question($id){
        $strSql = "SELECT * FROM msp_question where id='{$id}'";
        $query = $this->db->query($strSql);
//        $row = $query->row_object();
        $row = $query->row_array();
        return $row;
    }
    
    public function get_question_by_name($name=''){
        $name = $this->db->escape_str($name);
        $strSql = "SELECT * FROM msp_question WHERE name='{$name}'";
        $query = $this->db->query($strSql);
        $rows = $query->result();
        return $rows;
    }
    public function get_answer_by($key='', $val=''){
        $val = $this->db->escape_str($val);
        $strSql = "
            SELECT t1.*, t2.name question 
            FROM msp_answer t1, msp_question t2
            where 
                t1.qid = t2.id and t1.{$key}='{$val}'
        ";
        $query = $this->db->query($strSql);
        $rows = $query->result();
        return $rows;
    }
    public function get_category($id){
        $strSql = "SELECT * FROM msp_category where id='{$id}'";
        $query = $this->db->query($strSql);
//        $row = $query->row_object();
        $row = $query->row_array();
        return $row;
    }
    public function get_category_by_name($name=''){
        $name = $this->db->escape_str($name);
        $strSql = "SELECT * FROM msp_category WHERE name='{$name}'";
        $query = $this->db->query($strSql);
        $rows = $query->result();
        return $rows;
    }
    public function get_category_combo(){
        $category_list = $this->get_category_list();
        $results = array();
        $results[0] = "None";
        foreach($category_list as $v){
            $results[$v->id] = $v->name;
        }
        return $results;
    }
    public function get_category_list(){
    	$strSql = "SELECT * FROM msp_category";
        $query = $this->db->query($strSql);
        $rows = $query->result();
        return $rows;
    }
    public function add_category($datas){
        $rows = $this->get_category_by_name($datas['name']);
        if($rows){
            $this->errors[] = "This category already exists.";
            return false;
        }else{
            $query = $this->db->insert('msp_category', array('name'=>$datas['name']));
            if($id = $this->db->insert_id()){
                return $id;
            }else{
                return false;
            }
        }
    }
    
    public function add_question($datas){
        $rows = $this->get_question_by_name($datas['name']);
        if($rows){
            $this->errors[] = "This question already exists.";
            return false;
        }else{
            $query = $this->db->insert('msp_question', array('name'=>$datas['name'],'cid'=>$datas['cid']));
            if($id = $this->db->insert_id()){
                return $id;
            }else{
                return false;
            }
        }
    }
    
    public function isExistAnswer($datas){
        $datas['name'] = $this->db->escape_str($datas['name']);
        $strSql = "SELECT * FROM msp_answer where qid='{$datas['qid']}' and name='{$datas['name']}'";
        $query = $this->db->query($strSql);
//        $row = $query->row_object();
        $rows = $query->result();
        if(count($rows) > 0){
            return true;
        }else{
            return false;
        }
    }
    
    public function add_answer($datas){
        $datas['name'] = $this->db->escape_str($datas['name']);
        if($this->isExistAnswer($datas)){
            $this->errors[] = "This Answer for the question already exists.";
            return false;
        }else{
            $query = $this->db->insert('msp_answer', $datas);
            if($id = $this->db->insert_id()){
                return $id;
            }else{
                return false;
            }
        }
    }
    
    public function get_question_combo(){
        $questions = $this->get_question_list();
        $results = array();
        foreach($questions as $v){
            $results[$v->id] = $v->name;
        }
        return $results;
    }
    
    //Dashboard
    public function getUniqueUsers(){
        $count = $this->db->count_all_results('users');
        return $count;
    }
    
    private function _getGamesView(){
        $sql = "
            select t1.*, if(isnull(t2.time_stamp),0,t1.time_stamp) starttime, ifnull(t2.time_stamp, 0) endtime 
            from 
                (
                    select *
                    from msp_games
                    where 
                        isend=0
                ) t1 left join 
                (
                    select *
                    from msp_games
                    where 
                        isend=1
                ) t2 on t1.gameid=t2.gameid
        ";
        return $sql;
    }
    public function getUsagesByDate($start, $end){
        $gamesView = $this->_getGamesView();
        $sql = "
            select date_format(FROM_UNIXTIME( t1.starttime ) , '%Y/%m/%d') label, sum(t1.endtime-t1.starttime) gametime
            from ({$gamesView}) t1
            where t1.starttime>{$start} and t1.endtime<{$end}
            group by date_format(FROM_UNIXTIME( t1.starttime ) , '%Y-%m-%d')
            order by date_format(FROM_UNIXTIME( t1.starttime ) , '%Y-%m-%d')
        ";
        $query = $this->db->query($sql);
        $rows = $query->result();
        return $rows;
    }
    public function getUsagesByRegion(){
        $gamesView = $this->_getGamesView();
        $sql = "
            select t1.region label, sum(t1.endtime-t1.starttime) gametime
            from ({$gamesView}) t1
            group by t1.region
        ";
        $query = $this->db->query($sql);
        $rows = $query->result();
        return $rows;
    }
    public function getUsagesByUsertype(){
        $gamesView = $this->_getGamesView();
        $sql = "
            select t1.usertype label, sum(t1.endtime-t1.starttime) gametime
            from ({$gamesView}) t1
            group by t1.usertype
        ";
        $query = $this->db->query($sql);
        $rows = $query->result();
        $levels = array('Other', 'Tam', 'Seller', 'Other');
        foreach($rows as &$row){
            $row->label = $levels[$row->label];
        }
        return $rows;
    }
    public function getTotalTimeofGame(){
        $gamesView = $this->_getGamesView();
        $sql = "
            select sum(t1.endtime-t1.starttime) totaltime
            from ({$gamesView}) t1
        ";
        $query = $this->db->query($sql);
        $row = $query->row_object();
        $time = $row->totaltime;
        $hour = intval(gmdate("H", $time));
        $min = intval(gmdate("i", $time));
//        echo $min;exit;
        $time = $hour ? "{$hour}hr " : "";
        $time .= $min ? "{$min}min " : "";
        return ($time ? $time : "0hr");
    }
    public function getAvgtime(){
        $gamesView = $this->_getGamesView();
        $sql = "
            select (sum(t1.endtime-t1.starttime)/count(*)) avgtime
            from ({$gamesView}) t1
            where t1.starttime>0
        ";
        $query = $this->db->query($sql);
        $row = $query->row_object();
        $time = $row ? $row->avgtime : 0;
        
        $hour = intval(gmdate("H", $time));
        $min = intval(gmdate("i", $time));
        $secs = intval(gmdate("s", $time));
//        echo $min;exit;
        $time = $hour ? "{$hour}hr " : "";
        $time .= $min ? "{$min}min " : "";
        $time .= $secs ? "{$secs}sec " : "";
        return ($time ? $time : 0);
    }
    public function getNumberofQuestions(){
        $sql = "
            select count(*) numbers
            from msp_status
        ";
        $query = $this->db->query($sql);
        $row = $query->row_object();
        return ($row ? $row->numbers : 0);
    }
    public function getLeaderboard($sort_str){
      
            $sql = "select * 
                    from
                        msp_highscore ";
            if(trim($sort_str) != ""){
            	$sql .=" ORDER BY ".$sort_str;
            }
        $query = $this->db->query($sql);
        //echo $sql;exit;
        
        $rows = $query->result_array();
        return $rows;
        
    }
    public function clearLeaderboard(){
    	$sql = "DELETE FROM msp_highscore";
		return  $this->db->query($sql);
    }
    
    
    public function getNumberofAnswered(){
        $sql = "
            select count(*) numbers
            from msp_status
            where 
                status = 1
        ";
        $query = $this->db->query($sql);
        $row = $query->row_object();
        return ($row ? $row->numbers : 0);
    }
    
	public function getDifficultQuestion(){
        $sql = "
            select count(if(t1.status='1','1',null))/count(t1.qid) avgstatus, count(t1.qid) qcount,  t1.qid, t2.name question
            from msp_status t1 left join msp_question t2 on t1.qid=t2.id
            group by
                t1.qid
            order by avgstatus, qcount desc
        ";
        $query = $this->db->query($sql);
        $row = $query->row_object();
        return ($row ? $row->question : '');
        
    }
	
}