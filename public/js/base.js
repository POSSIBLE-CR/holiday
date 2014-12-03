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


/*
$('.hola').on('click', function(e){
    e.preventdefault;
    console.log('Test');
    			
    return false;             
});

$( ".hola" ).click(function() {   
    return false;
});
*/  
/*

$( ".btn icon-twitter" ).click(function() {
    alert("tw");
    $.cookie("social_login", "tw");
});    

$( ".btn icon-facebook" ).click(function() {
    alert("fb");
    $.cookie("social_login", "fb");
});    
*/


function hola(){
	
	console.log(document.cookie);
	$.removeCookie('social_login', { path: '/' });
	console.log(document.cookie);

}

