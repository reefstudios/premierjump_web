<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Answer extends CI_Controller {

	function __construct()
	{
		parent::__construct();
        $this->load->library('session');
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
		redirect('answer/answer_list', '');
	}
	
	public function answer_list()
	{
        $questions = $this->main_m->get_question_list();
		$answers = $this->main_m->get_answer_list();
        $results = array();
        foreach($questions as $key=>$q_obj){
            $results[$key]['question'] =  $q_obj->name;
            $results[$key]['answers'] = array();
            foreach($answers as $v_obj){
                if($q_obj->id == $v_obj->qid){
                    $results[$key]['answers'][] = $v_obj;
                }
            }
        }
        $data['answers'] = $results;
		$this->load->view('answer_list', $data);
	}
	public function answer_create()
	{
        $qid = $this->uri->segment(3, 0);
		$this->data = $this->_proc_add();
        $this->data['qid'] = $qid;
        $this->data['questions'] = $this->main_m->get_question_combo();
        if($this->session->userdata('sucess_update')){
            $this->data['success_message'] = $this->session->userdata('sucess_update');
            $this->session->unset_userdata('sucess_update');
        }
		$this->data['answer_name'] = array(
                'name'  => 'answer_name',
                'id'    => 'answer_name',
                'type'  => 'text',
//                'value' => $this->input->post('answer_name', ''),
                'value' => $this->form_validation->set_value('answer_name')
            );
		
		$this->load->view('answer_add', $this->data);
	}
	
    private function _proc_add() {
        
        //validate form input
        $this->form_validation->set_rules('answer_name', "Answer", 'required|xss_clean');
        
        $qry = array();
        $data = array();
        if ($this->form_validation->run() == true)
        {
            $qry = array(
                'qid' => $this->input->post('question'),
                'name' => $this->input->post('answer_name'),
                'is_correct' => $this->input->post('is_correct')
            );

            if($this->main_m->add_answer($qry)){
                $this->session->set_userdata('sucess_update', "Successfully Created.");
                redirect("answer/answer_create/".$this->input->post('question'), '');
            }elseif($errors = $this->main_m->get_errors()){
                $data['show_errors'] = $errors;
            }
//            $data['show_errors']
        }
        return $data;
    }
    
	public function answer_edit()
	{
		$id = $this->uri->segment(3, 0);
		if (empty($id)) {
			show_error("Select a question to edit!");
			return;
		}
		
        $this->data = $this->_proc_edit($id);
        $this->data['question'] = $this->main_m->get_answer_by('id', $id);
        if($this->session->userdata('sucess_update')){
            $this->data['success_message'] = $this->session->userdata('sucess_update');
            $this->session->unset_userdata('sucess_update');
        }
        $this->data['answer_name'] = array(
                'name'  => 'answer_name',
                'id'    => 'answer_name',
                'type'  => 'text',
//                'value' => $this->input->post('answer_name', ''),
                'value' => $this->input->post('answer_name') ? $this->input->post('answer_name') : $this->data['question'][0]->name
            );
        
			
		$this->load->view('answer_edit', $this->data);
	}

	public function answer_del()
	{
		$id = $this->uri->segment(3, 0);
		if (empty($id)) {
			show_error("select a question to delete!");
			return;
		}
        $answer = $this->main_m->get_answer_by('id', $id);
        
		$strSql = "DELETE FROM msp_answer WHERE id='{$id}' ";
		$this->db->query($strSql);
		redirect('question/question_edit/'.$answer[0]->qid, '');
	}
	
	private function _proc_edit($id) {
		
		
		//validate form input
		$this->form_validation->set_rules('answer_name', "Question", 'required|xss_clean');
		
		$qry = array();
		$data = array();
		
		if ($this->form_validation->run() == true)
		{
            $obj = $this->main_m->get_answer_by('id', $id);
			$qry = array_merge(	
				$qry,
				array(
                    'name'            => $this->db->escape_str($this->input->post('answer_name')),
				    'is_correct'      => $this->input->post('is_correct'),
                    'qid'             => $obj[0]->qid
				)
			);
			if($this->main_m->isExistAnswer($qry)){
                $data['show_errors'][] = 'This Answer for the question already exists.';
            }else{
                $this->db->where('id', $id);
                if($this->db->update('msp_answer', $qry)){
                    redirect("question/question_edit/".$obj[0]->qid, '');
                }
            }
		}
		return $data;
	}
	
	
}

/* End of file main.php */
/* Location: ./application/controllers/main.php */