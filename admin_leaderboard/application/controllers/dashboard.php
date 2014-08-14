<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dashboard extends CI_Controller {

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
        $data['unique_users'] = $this->main_m->getUniqueUsers();
        $data['totaltimeofgame'] = $this->main_m->getTotalTimeofGame();
        $data['avgtime'] = $this->main_m->getAvgtime();
        $data['numberofquestions'] = $this->main_m->getNumberofQuestions();
        $data['numberofanswered'] = $this->main_m->getNumberofAnswered();
        $data['difficultquestion'] = $this->main_m->getDifficultQuestion();
        $data['usagesbyregion'] = json_encode($this->main_m->getUsagesByRegion());
        $data['usagesbyusertype'] = json_encode($this->main_m->getUsagesByUsertype());
        $this->load->view('dashboard_view', $data);
        
    //    $this->load->view('main_v');
//        redirect('dashboard/question_list', '');
    }
    
    public function question_list()
    {
        $data['questions'] = $this->main_m->get_question_list();
        $this->load->view('question_list', $data);
    }
    public function question_create()
    {
        $this->data = $this->_proc_add();
        $this->data['question_name'] = array(
                'name'  => 'question_name',
                'id'    => 'question_name',
                'type'  => 'text',
//                'value' => $this->input->post('question_name', ''),
                'value' => $this->form_validation->set_value('question_name')
            );
        
        $this->load->view('question_add', $this->data);
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
    
    private function _proc_add() {
        
        //validate form input
        $this->form_validation->set_rules('question_name', "Question", 'required|xss_clean');
        
        $qry = array();
        $data = array();
        if ($this->form_validation->run() == true)
        {
            $qry = array(
                'name' => $this->input->post('question_name')
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
                    'name'            => $this->db->escape_str($this->input->post('question_name')),
                )
            );
//            print_r($this->main_m->get_question_by_name($this->input->post('question_name'))) ;
            if(count($this->main_m->get_question_by_name($this->input->post('question_name'))) > 0){
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
    
    
}

/* End of file main.php */
/* Location: ./application/controllers/main.php */