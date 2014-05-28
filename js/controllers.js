var steria = steria || {};

(function ($) {

	steria.initializeControllers = function () {
		var $notename = $('.notename');
    	var $header = $('h3');

    	$notename.on('keyup', function () {
    		$header.text($notename.val());
    	});
	};


}(Zepto));