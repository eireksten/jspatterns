Zepto(function () {
	"use strict";

    var $notename = $('.notename');
    var $header = $('h3');

    $notename.on('keyup', function () {
    	$header.text($notename.val());
    });

});