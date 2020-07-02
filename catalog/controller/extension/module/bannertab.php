<?php
class ControllerExtensionModuleBannertab extends Controller {
	public function index($setting) {		

		$this->load->model('design/banner');
		$this->load->model('tool/image');
		$this->load->language('extension/module/bannertab');


		$data['text_new_bannertab'] = $this->config->get('text_new_bannertab');
		$data['text_sale_bannertab'] = $this->config->get('text_sale_bannertab');
		$data['text_colection_bannertab'] = $this->config->get('text_colection_bannertab');
		$data['text_best_bannertab'] = $this->config->get('text_best_bannertab');
		$data['text_bigsize_bannertab'] = $this->config->get('text_bigsize_bannertab');
		$data['text_blog_bannertab'] = $this->config->get('text_blog_bannertab');
		$data['text_discount_day_bannertab'] = $this->config->get('text_discount_day_bannertab');
		
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

		return $this->load->view('extension/module/bannertab', $data);
	}
}
