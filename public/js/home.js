/* * POSSIBLE * * HOLIDAY APP * * Map Namespace */

var home = home || {};

(function (context, $) {
	vars = {};

	function startMessageAnimation () {
		var messageCycle = setInterval( function () {
			var $activeMessage = $(".messages .message.active"),
				$nextMessage = ($activeMessage.next().length)? $activeMessage.next() : $(".messages .message:first");

			$activeMessage.addClass("fadeOutUp");
			//$nextMessage.addClass("active fadeInUp");

			var loop =  setInterval( function () { 
				$activeMessage.removeClass("active fadeInUp fadeOutUp");
				$nextMessage.addClass("active fadeInUp");
				clearInterval(loop);
			}, 900);
	    }, 6000);
	}

	/* INIT */

	function init () {
		startMessageAnimation();
	}

	$(init);

}(home, jQuery));