<?php
class ControllerExtensionModuleBannerHom extends Controller {
	public function index($setting) {	
		static $module = 0;	

		$this->load->model('design/banner');
		$this->load->model('tool/image');
		$this->load->language('extension/module/bannerhom');


		$data['text_new_bannerhom'] = $this->config->get('text_new_bannerhom');
		$data['text_sale_bannerhom'] = $this->config->get('text_sale_bannerhom');

		
		$data['banners'] = array();

		$results = $this->model_design_banner->getBanner($setting['banner_id']);

		foreach ($results as $result) {
			if (is_file(DIR_IMAGE . $result['image'])) {
				$data['banners'][] = array(
					'title' => $result['title'],
					'description' => html_entity_decode($result['description'],  ENT_QUOTES, 'UTF-8'),
					'link'  => $result['link'],
					'image' => $this->model_tool_image->resize($result['image'], $setting['width'], $setting['height'])
				);
			}
		}

		$data['module'] = $module++;

		return $this->load->view('extension/module/bannerhom', $data);
	}
}
