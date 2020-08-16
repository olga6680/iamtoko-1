<?php
class ControllerExtensionEboptionimageOptionimage extends Controller {
	public function index() {
		$json=array();
		$this->load->model('tool/image');
		if(!empty($this->request->get['product_option_value_id'])){
			$product_option_value_id = $this->request->get['product_option_value_id'];
		}else{
			$product_option_value_id = 0;
		}
		
		
		if(!empty($this->request->get['product_id'])){
			$product_id = $this->request->get['product_id'];
		}else{
			$product_id = 0;
		}
		
		//SET DEFAULT MAIN IMAGE
		$mainimage ='';
		$this->load->model('catalog/product');
		$product_info = $this->model_catalog_product->getProduct($product_id);
		if ($product_info){
			$data['thumb'] = $this->model_tool_image->resize($product_info['image'],$this->config->get('theme_' . $this->config->get('config_theme') . '_image_thumb_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_thumb_height'));
			$data['popup'] = $this->model_tool_image->resize($product_info['image'],$this->config->get('theme_' . $this->config->get('config_theme') . '_image_popup_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_popup_height'));
			$data['additional'] = $this->model_tool_image->resize($product_info['image'],$this->config->get('theme_' . $this->config->get('config_theme') . '_image_additional_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_additional_height'));
			$data['heading_title'] = $product_info['name'];
		
		
		$query = $this->db->query("SELECT * FROM ".DB_PREFIX."product_option_value_image WHERE product_option_value_id = '".(int)$this->request->get['product_option_value_id']."'");
		$notimage = false;
		if(!empty($query->row['image'])){
			$notimage = true;
			$data['thumb'] = $this->model_tool_image->resize($query->row['image'],$this->config->get('theme_' . $this->config->get('config_theme') . '_image_thumb_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_thumb_height'));
			$data['popup'] = $this->model_tool_image->resize($query->row['image'],$this->config->get('theme_' . $this->config->get('config_theme') . '_image_popup_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_popup_height'));
			$data['additional'] = $this->model_tool_image->resize($query->row['image'],$this->config->get('theme_' . $this->config->get('config_theme') . '_image_additional_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_additional_height'));
		}
		
		$squery = $this->db->query("SELECT poiv.product_option_value_id,poi.image FROM ".DB_PREFIX."product_option_image poi LEFT JOIN ".DB_PREFIX."product_option_image_value poiv ON(poi.product_option_image_id = poiv.product_option_image_id) WHERE poi.product_id = '".(int)$product_id."' AND poiv.product_option_value_id = '".(int)$product_option_value_id."' ORDER BY poi.sort_order ASC");
		
		$data['images']=array();
		foreach($squery->rows as $key => $row):
		if($row['image']){
			if(!$notimage){
				$notimage = true;
				$data['thumb'] = $this->model_tool_image->resize($row['image'],$this->config->get('theme_'.$this->config->get('config_theme') . '_image_thumb_width'), $this->config->get('theme_'.$this->config->get('config_theme') . '_image_thumb_height'));
			}
			$data['images'][] = array(
				'popup' => $this->model_tool_image->resize($row['image'],$this->config->get('theme_' . $this->config->get('config_theme') . '_image_popup_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_popup_height')),
				'thumb' => $this->model_tool_image->resize($row['image'],$this->config->get('theme_' . $this->config->get('config_theme') . '_image_thumb_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_thumb_height')),
				'additional' => $this->model_tool_image->resize($row['image'],$this->config->get('theme_' . $this->config->get('config_theme') . '_image_additional_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_additional_height')),
			);
		}
		endforeach;
		
		 $json['html'] = $this->load->view('extension/eboptionimage/optionimage', $data,true);
		}
		
		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
	}
}