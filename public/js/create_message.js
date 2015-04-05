/* * POSSIBLE * * HOLIDAY APP * * Create Message Namespace */

var createMessage = createMessage || {};

(function (context, $) {

	vars = {
		isTwitter : false
	};

	function setSocialNetwork () {
		var socialNetwork = $.cookie('possible.holiday.socialNetwork');
		if (socialNetwork !== undefined) {
			switch (socialNetwork) {
				case "facebook":
					break;
				case "twitter":
					vars.isTwitter = true;
					break;
			}
		}
	}

	function updateSharableURL (message) {
		var url;
		if (vars.isTwitter) {
			url = "https://twitter.com/home?status=" + encodeURI(message);
		} else {
			url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(message);
		}

		$(".share-button").attr("href", url);
	}

	/* INIT */

	function init () {
		//setShareURL();
		setSocialNetwork();

		$(".share-button").on('click', function (event) {
			$(this).next().trigger('click');
		});

		$(".text-message").on('keyup', function (event) {
			updateSharableURL(event.target.value);
		});
	}

	$(init);

}(createMessage, jQuery));