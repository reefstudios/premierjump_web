<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Question extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->library('ion_auth');
		$this->load->library('form_validation');
		$this->load->helper('url');
		
		if (!$this->ion_auth->logged_in())
		{
			//redirect them to the login page
			redirect('auth/login', 'refresh');
			return;
		}
		$this->load->helper('language');
		$this->load->model('main_m');
		
		$this->form_validation->set_error_delimiters(
			$this->config->item('error_start_delimiter'), 
			$this->config->item('error_end_delimiter')
		);
		
	}
	
	function _remap($method) {

			$this->load->view('header_v');
			$this->load->view('sidebar_v');
			$this->{$method}();
			$this->load->view('footer_v');

	}
	
	public function index()
	{
		
	//	$this->load->view('main_v');
		redirect('question/question_list', '');
	}
	public function category_list(){
		$data = array();
		$data['category_list'] = $this->main_m->get_category_list();
		$this->load->view('category_list', $data);
	} 
	public function category_create()
	{
		$this->data = array();
		$this->data = $this->_proc_category_add();
		$this->data['category_name'] = array(
                'name'  => 'category_name',
                'id'    => 'category_name',
                'type'  => 'text',
//                'value' => $this->input->post('question_name', ''),
                'value' => $this->form_validation->set_value('category_name')
            );
		
		$this->load->view('category_add', $this->data);
	}
	public function category_edit(){
		$id = $this->uri->segment(3, 0);
		if (empty($id)) {
			show_error("Select a category to edit!");
			return;
		}
		
		$this->data = $this->_proc_category_edit($id);
		$this->data['category'] = $this->main_m->get_category($id);
        $this->data['category_name'] = array(
                'name'  => 'category_name',
                'id'    => 'category_name',
                'type'  => 'text',
                'value' => $this->input->post('category_name') ? $this->input->post('category_name') : $this->data['category']['name']
            );
			
		$this->load->view('category_edit', $this->data);
	}
	
	private function _proc_category_add() {
		
		//validate form input
		$this->form_validation->set_rules('category_name', "Category", 'required|xss_clean');
		$qry = array();
		$data = array();
		if ($this->form_validation->run() == true)
		{
            $qry = array(
                'name' => $this->input->post('category_name')
            );
			if($this->main_m->add_category($qry)){
                redirect("question/category_list", '');
            }elseif($errors = $this->main_m->get_errors()){
                $data['show_errors'] = $errors;
            }
//            $data['show_errors']
		}
		return $data;
	}
	private function _proc_category_edit($id) {
		
		$this->load->library('upload');
		
		//validate form input
		$this->form_validation->set_rules('category_name', "Category", 'required|xss_clean');
		
		$qry = array();
		$data = array();
		
		if ($this->form_validation->run() == true)
		{
			$qry = array_merge(	
				$qry,
				array(
					'name'			=> $this->db->escape_str($this->input->post('category_name')),
				)
			);
//            print_r($this->main_m->get_question_by_name($this->input->post('question_name'))) ;
			if(count($this->main_m->get_category_by_name($this->input->post('category_name'))) > 0){
                $data['show_errors'][] = 'The category already exists.';
            }else{
                $this->db->where('id', $id);
                if($this->db->update('msp_category', $qry)){
                    redirect("question/category_list", '');
                }
            }
		}
		return $data;
	}	
	public function category_del()
	{
		$id = $this->uri->segment(3, 0);
		if (empty($id)) {
			show_error("select a category to delete!");
			return;
		}
        $strSql = "DELETE FROM msp_category WHERE id='{$id}' ";
        $this->db->query($strSql);
        $qry = array("cid"=>0);
        $this->db->where('cid', $id);
        if($this->db->update('msp_question', $qry)){
            redirect("question/category_list", '');
        }
        
		redirect("question/category_list", '');
	}
	public function question_list()
	{
        $sort_type = $this->input->post("sort_type");
        $sort_value = $this->input->post("sort_value");
		
		$temp_list = $this->main_m->get_category_list();
        $category_list = array();
        $non_obj = new stdClass();
        $non_obj->id = 0;
        $non_obj->name = "None";
        $category_list[0] = $non_obj;
        foreach($temp_list as $v){
            $category_list[$v->id] = $v;
        }
        $data['sort_type'] = $sort_type;
        $data['sort_value'] = $sort_value;
		$data['category_list'] = $category_list;
		$data['questions'] = $this->main_m->get_question_list($sort_type." ".$sort_value);
		$this->load->view('question_list', $data);
	}
	public function clear_question_status(){
		$this->main_m->clearQuestionStatus();
        redirect('/question/question_list', 'refresh');
    }
	
	public function question_create()
	{
		$this->data = $this->_proc_add();
		$cid = $this->uri->segment(3, 0);
		$this->data['cid'] = $cid;
		$this->data['category'] = $this->main_m->get_category_combo();
		$this->data['question_name'] = array(
                'name'  => 'question_name',
                'id'    => 'question_name',
                'type'  => 'text',
//                'value' => $this->input->post('question_name', ''),
                'value' => $this->form_validation->set_value('question_name')
            );
		
		$this->load->view('question_add', $this->data);
	}
	public function leaderboard_view(){
        $sort_type = $this->input->post("sort_type");
        $sort_value = $this->input->post("sort_value");
        $datas['sort_type'] = $sort_type;
        $datas['sort_value'] = $sort_value;
        $datas['datas'] = $this->main_m->getLeaderboard($sort_type." ".$sort_value);
        $this->load->view('leaderboard_view', $datas);
    }
	public function clear_leaderboard(){
		$this->main_m->clearLeaderboard();
        redirect('/question/leaderboard_view', 'refresh');
    }
    
	public function question_edit()
	{
		$id = $this->uri->segment(3, 0);
		if (empty($id)) {
			show_error("Select a question to edit!");
			return;
		}
		
        $answers = $this->main_m->get_answer_by('qid', $id);
		
		$this->data = $this->_proc_edit($id);
		$this->data['category'] = $this->main_m->get_category_combo();		
        $this->data['answers'] = $answers;
		$this->data['question'] = $this->main_m->get_question($id);
        $this->data['question_name'] = array(
                'name'  => 'question_name',
                'id'    => 'question_name',
                'type'  => 'text',
                'value' => $this->input->post('question_name') ? $this->input->post('question_name') : $this->data['question']['name']
            );
			
		$this->load->view('question_edit', $this->data);
	}
	public function question_switch(){
		$id = $this->uri->segment(3, 0);
		$switch_val = $this->uri->segment(4, 0);
		if (empty($id)) {
			show_error("Select a question to edit!");
			return;
		}
		$qry =	array(
					'on_off' => $switch_val,
				);
        $this->db->where('id', $id);
        if($this->db->update('msp_question', $qry)){
            redirect("question/question_list", '');
        }
	}
	public function category_switch(){
		$id = $this->uri->segment(3, 0);
		$switch_val = $this->uri->segment(4, 0);
		if (empty($id)) {
			show_error("Select a category to edit!");
			return;
		}
		$qry =	array(
					'on_off' => $switch_val,
				);
        $this->db->where('id', $id);
        if($this->db->update('msp_category', $qry)){
        	$this->db->where('cid', $id);
        	if($this->db->update('msp_question', $qry)){
        		redirect("question/question_list", '');
        	}
        }
	}
	
	public function settings_val(){
		$field = $this->uri->segment(3, "");
		$val = $this->uri->segment(4, 0);
		if (empty($field)) {
			show_error("Select a setting value");
			return;
		}
		$qry =	array(
					'value' => $val,
				);
        $this->db->where('field', $field);
        if($this->db->update('settings', $qry)){
            redirect("question/settings_view", '');
        }
	}
	public function question_del()
	{
		$id = $this->uri->segment(3, 0);
		if (empty($id)) {
			show_error("select a question to delete!");
			return;
		}
        $strSql = "DELETE FROM msp_question WHERE id='{$id}' ";
        $this->db->query($strSql);
		$strSql = "DELETE FROM msp_answer WHERE qid='{$id}' ";
		$this->db->query($strSql);
		redirect("question/question_list", '');
	}
	public function settings_view(){
		$this->data = $this->_file_upload();	
		$this->data['settings'] = $this->main_m->get_settings_values();
		$this->load->view('settings_view', $this->data);	
	}
	private function _proc_add() {
		
		//validate form input
		$this->form_validation->set_rules('question_name', "Question", 'required|xss_clean');
		
		$qry = array();
		$data = array();
		if ($this->form_validation->run() == true)
		{
            $qry = array(
                'name' => $this->input->post('question_name'),
                'cid'  =>$this->input->post('category')
            );
			if($this->main_m->add_question($qry)){
                redirect("question/question_list", '');
            }elseif($errors = $this->main_m->get_errors()){
                $data['show_errors'] = $errors;
            }
//            $data['show_errors']
		}
		return $data;
	}
    
	private function _proc_edit($id) {
		
		$this->load->library('upload');
		
		//validate form input
		$this->form_validation->set_rules('question_name', "Question", 'required|xss_clean');
		
		$qry = array();
		$data = array();
		
		if ($this->form_validation->run() == true)
		{
			$qry = array_merge(	
				$qry,
				array(
					'name'			=> $this->db->escape_str($this->input->post('question_name')),
					'cid'	 		=>$this->input->post('category')
				)
			);
//            print_r($this->main_m->get_question_by_name($this->input->post('question_name'))) ;
			$old_question = $this->main_m->get_question($id);
			if($old_question["cid"]==$this->input->post('category') && count($this->main_m->get_question_by_name($this->input->post('question_name'))) > 0){
                $data['show_errors'][] = 'The question already exists.';
            }else{
                $this->db->where('id', $id);
                if($this->db->update('msp_question', $qry)){
                    redirect("question/question_list", '');
                }
            }
		}
		return $data;
	}
   	private function &_file_upload() {
    	
    	$this->load->library('upload');
			if (isset($_FILES['turnoff_img']) && $_FILES['turnoff_img']['name'] != '') {
				
				//$new_fname = str_replace(' ', '_', strtolower($_FILES['logo_file']['name']));
				$ext = pathinfo($_FILES['turnoff_img']['name'],PATHINFO_EXTENSION);
				if($ext =="png" || $ext == "PNG"){
					$new_fname = "turnoff_img";
					$conf = array();
					$conf['upload_path'] 	= "./upload";
					$conf['allowed_types']	= $this->config->item('upload_imgtype');
					$conf['max_size']		= $this->config->item('upload_imgsize');
					$conf['overwrite']		= TRUE;
					$conf['remove_spaces']	= TRUE;
					$conf['file_name']		= $new_fname;
					
					if (!file_exists($conf['upload_path'])) {
						mkdir($conf['upload_path']);
					}
					
					$this->upload->initialize($conf);
					
					if ($this->upload->do_upload('turnoff_img')) {
						
						$fileinfo = $this->upload->data();
						if ($fileinfo['file_size'] > 0) {
							$qry['file_name'] = $new_fname;
						//	unlink($fileinfo['full_path']);
							$data["full_path"] =$fileinfo['full_path'];
						}
						$data['success'] = true;
					} else {
						$data['success'] = false;
						$data['show_errors'] = $this->upload->display_errors();
					}
				}else{
						$data['success'] = false;
						$data['show_errors'] = "Please use only PNG file";
				}
			}
		return $data;	
    } 		
	
}

/* End of file main.php */
/* Location: ./application/controllers/main.php */