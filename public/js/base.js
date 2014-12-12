function setCookie(cookie){

	if(cookie == "tw"){
		$.cookie("social_login", "tw");
	}
	else{
		$.cookie("social_login", "fb");
	}
}

var base = base || {};

base.party = (function ($) {


	function init() {

        $('.hola').on('click', function(){
              
                          
        });
    }
	
	return {
        init: init
    };

})(jQuery);
base.party.init();


function hola(){
	
	console.log(document.cookie);
	$.removeCookie('social_login', { path: '/' });
	console.log(document.cookie);

}

