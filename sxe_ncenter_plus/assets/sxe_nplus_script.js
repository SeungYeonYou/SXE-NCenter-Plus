function runSXENcenterPlus(sxe_push_method,target) {
	if(!window.sxe_ncenter_plus_delay) window.sxe_ncenter_plus_delay = 10000;
	if (sxe_push_method == 'sse') {
		console.log(target + 'sse');
		var listener = function (event) {
			console.log(event);
			sxeAJAXPush(event.push);
		};
		//es.addEventListener("open", listener);
		es.addEventListener("message", listener);
		es.addEventListener("error", listener);
	} else if (sxe_push_method == 'ajax') {
		setInterval(function () {
			jQuery.ajax({
				type:"GET",
				url:target + 'ajax',
				success:function(event){
					sxeAJAXPush(event.push);
				}
			});
		},window.sxe_ncenter_plus_delay);
	}
}

function sxeAJAXPush(push){
	toastr.options = {
	  "closeButton": true,
	  "debug": false,
	  "positionClass": "toast-top-left",
	  "showDuration": "300",
	  "hideDuration": "1000",
	  "timeOut": "30000",
	  "extendedTimeOut": "30000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showsxe_push_method": "fadeIn",
	  "hidesxe_push_method": "fadeOut"
	}
	toastr.options.onclick = function () {
		if (confirm("새 알림 확인을 위해 새로고침됩니다! 작성하시던 글이나 댓글이 있다면 저장하세요 :)")) location.reload();
	};
	if (push > window.sxe_last) {
		toastr['success']("지금 이 메세지를 클릭하여<br />알림을 확인해보세요!<br /><br />이 메세지는 30초 후 자동으로 사라집니다.", "새 알림 "+(push - window.sxe_last)+"개가 있으며,<br />총 알림 "+push+"개가 있습니다.");
	}
	window.sxe_last = push;
}