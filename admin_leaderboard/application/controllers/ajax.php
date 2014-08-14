<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class AJAX extends REST_Controller {

	function __construct()
	{
		parent::__construct();
        $this->load->library('ion_auth');
//        echo $token;exit;
		$this->load->library('form_validation');
		$this->load->helper('url');
		$this->load->helper('language');
        $this->load->model('main_m');
		
		$this->form_validation->set_error_delimiters(
//			$this->config->item('error_start_delimiter'), 
//			$this->config->item('error_end_delimiter')
		);
	}
    function _remap($method) {

            $this->load->view('header_v');
            $this->load->view('sidebar_v');
            $this->{$method}();
            $this->load->view('footer_v');

    }
    /**
    * non-rest api
    */
    public function getUsagesByDate(){ 
        $start = $this->post("start");
        $end = $this->post("end");
        $result = $this->main_m->getUsagesByDate($start, $end);
        $result || $result=array('result'=>'empty');
        $this->response($result);
    }
}

/* End of file main.php */
/* Location: ./application/controllers/main.php */