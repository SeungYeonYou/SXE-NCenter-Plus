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
		if (confirm("�� �˸� Ȯ���� ���� ���ΰ�ħ�˴ϴ�! �ۼ��Ͻô� ���̳� ����� �ִٸ� �����ϼ��� :)")) location.reload();
	};
	if (push > window.sxe_last) {
		toastr['success']("���� �� �޼����� Ŭ���Ͽ�<br />�˸��� Ȯ���غ�����!<br /><br />�� �޼����� 30�� �� �ڵ����� ������ϴ�.", "�� �˸� "+(push - window.sxe_last)+"���� ������,<br />�� �˸� "+push+"���� �ֽ��ϴ�.");
	}
	window.sxe_last = push;
}