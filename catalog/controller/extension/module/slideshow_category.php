<?php
class ControllerExtensionModuleSlideshowCategory extends Controller {
	public function index($setting) {
		static $module = 0;		

		$this->load->model('design/banner');
		$this->load->model('tool/image');

		$this->document->addStyle('catalog/view/javascript/jquery/swiper/css/swiper.min.css');
		$this->document->addStyle('catalog/view/javascript/jquery/swiper/css/opencart.css');
		$this->document->addScript('catalog/view/javascript/jquery/swiper/js/swiper.jquery.js');

		$data['banners'] = array();

		$results = $this->model_design_banner->getBannerForCategory();

		foreach ($results as $result) {
			if (is_file(DIR_IMAGE . $result['image']) && $this->isCategory($result['category_id'])) {
				$data['banners'][] = array(
					'title' => $result['title'],
					'link'  => $result['link'],
					'description' => html_entity_decode($result['description'],  ENT_QUOTES, 'UTF-8'),
					'image' => $this->model_tool_image->resize($result['image'], $setting['width'], $setting['height']),
					'baner_id' => $result['banner_id'],
					'category_id' => $result['category_id']
				);
			}
		}

		$data['module'] = $module++;

		return $this->load->view('extension/module/slideshow_category', $data);
	}

	protected function isCategory($banner_category_id) {
		$parts = explode('_', (string)$this->request->get['path']);
		$category_id = (int)array_pop($parts);
		if((int)$banner_category_id == $category_id) {
			return true;
		} else {
			return false;
		}
	}
}
