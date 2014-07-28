<?php
	if(!defined("__XE__")) exit();
	if(Context::get('module')=='admin' && $called_position != 'before_display_content' && $called_position != 'before_module_init'){return;}

	/**
	* @addon sxe_ncenter_plus.addon.php
	* @author SeungXE (SeungYeonYou.KR+XE@gmail.com)
	* @brief SXE 알림센터 Plus 애드온
	**/
	
	if($called_position=='before_module_init' && Context::get('sxe_ajax')=='sxe_ncenter_plus'){
		$oNcenter = &getModel('ncenterlite');
		$count = $oNcenter->_getNewCount();
		if(Context::get('sxe_ajax_method')=='sxe_sse'){
			header("Content-Type: text/event-stream");
			header("Cache-Control: no-cache");
			header("Access-Control-Allow-Origin: *");
			$delay = '10';
			if($addon_info->delay>0) $delay = $addon_info->delay;
			sleep($delay);
			echo ":" . str_repeat(" ", 2048) . "\n";
			echo "id: push\n";
			echo "data: " . $count . ";";
			Context::close();
			exit();
		}elseif(Context::get('sxe_ajax_method')=='sxe_ajax'){
			header('Content-Type: application/json');
			header('Cache-Control: no-cache');
			header("Access-Control-Allow-Origin: *");
			echo json_encode(array('push'=>$count));
			Context::close();
			exit();
		}else{
			header('Content-Type: application/json');
			header('Cache-Control: no-cache');
			header("Access-Control-Allow-Origin: *");
			echo '{"status":"error. no method configured for sxe_ajax & sxe_ncenter_plus"}';
			Context::close();
			exit();
		}
	}
	
	if($called_position=='before_module_init' && !Context::get('sxe_ajax') && Context::getResponseMethod() == 'HTML'){
		$oNcenter = &getModel('ncenterlite');
		$count = $oNcenter->_getNewCount();
		
		if($addon_info->load_by=='jsdeliver'){
			Context::loadFile('///cdn.jsdelivr.net/toastr/2.0.1/toastr.min.css');
			Context::loadFile('///cdn.jsdelivr.net/toastr/2.0.1/toastr.min.js');
		}elseif($addon_info->load_by=='cdnjs'){
			Context::loadFile('///cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css');
			Context::loadFile('///cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js');
		}else{
			Context::loadFile('./addons/sxe_ncenter_plus/assets/toastr.min.js');
			Context::loadFile('./addons/sxe_ncenter_plus/assets/toastr.min.css');
		}
		Context::loadFile('./addons/sxe_ncenter_plus/assets/eventsource.min.js');
		Context::loadFile('./addons/sxe_ncenter_plus/assets/sxe_nplus_script.min.js');
		$sxe_delay = '10000';
		if($addon_info->delay) $sxe_delay = $addon_info->delay * 1000;
		Context::addHTMLFooter('<script>var sxe_ncenter_plus_delay = '.$sxe_delay.'; var sxe_last = '.$count.'; runSXENcenterPlus("'.$addon_info->method.'","'.getNotEncodedUrl('','sxe_ajax','sxe_ncenter_plus','sxe_ajax_method','sxe_').'");</script>');
	}
?>