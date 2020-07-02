<?php
class ControllerExtensionModuleAdvantage extends Controller {
	public function index($setting) {

		$this->load->language('extension/module/advantage');

		$data['title_advantage_sending'] = $this->config->get('title_advantage_sending');
		$data['title_advantage_delivery'] = $this->config->get('title_advantage_delivery');
		$data['title_advantage_payment'] = $this->config->get('title_advantage_payment');

		$data['text_advantage_sending'] = $this->config->get('text_advantage_sending');
		$data['text_advantage_delivery'] = $this->config->get('text_advantage_delivery');
		$data['text_advantage_payment'] = $this->config->get('text_advantage_payment');		

		$data['button_advantage'] = $this->config->get('button_advantage');
;

		$this->load->model('catalog/information');

    $data['informations'] = array();

    foreach ($this->model_catalog_information->getInformations() as $result) {
      if ($result['bottom']) {
        $data['informations'][] = array(
          'title' => $result['title'],
          'href'  => $this->url->link('information/information', 'information_id=' . $result['information_id'])
        );
      }
    }

		$data['advantage_sending'] = $this->url->link('information/information', array('information_id'=>6));

			return $this->load->view('extension/module/advantage', $data);
	}
}