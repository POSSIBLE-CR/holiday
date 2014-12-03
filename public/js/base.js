var a = "hola";

$( ".btn icon-twitter" ).click(function() {
    alert("tw");
    $.cookie("social_login", "tw");
});    

$( ".btn icon-facebook" ).click(function() {
    alert("fb");
    $.cookie("social_login", "fb");
});    


$( "#hola" ).click(function() {
    console.log('ww');
    alert("fb");
});  