var holiday = holiday || {};

holiday.party = (function ($) {
    
    var x = $('#demo'),
        data = null,
        latitude = null,
        longitude = null;
    
    // DETECTING IF GEOLOCATION IS ACTIVATED
    function init() {
        $('button').on('click', function(e){
              e.preventdefault;
              navigator.geolocation.getCurrentPosition(allowLocation,deniedLocation);
              return false;
        });
    }
    
    // IF ALLOW
    function allowLocation(position){
        console.log('working');
        navigator.geolocation.getCurrentPosition(function(pos){
            latitude = pos.coords.latitude;
            longitude = pos.coords.longitude;
            showPosition();

            console.log('Option 1 worked = lat: ' + latitude + ' ' + 'lon: ' + longitude);
        });
    }
    
    // IF NOT ALLOW
    function deniedLocation() {
        console.log("Option 1 didn't worked");
        
        $.getJSON("http://ip-api.com/json/?callback=?", function(location) {
            latitude = location.lat;
            longitude = location.lon;
            
            console.log('Option 2 worked = lat: ' + latitude + ' ' + 'lon: ' + longitude);
            showPosition();
            
        }).fail(function() {
            console.log("Option 2 didn't worked");
            fallout2();
        });
    }
    
    function fallout2(){
        $.get("http://ipinfo.io", function(response) {
            latitude = response.loc.split(',')[0];
            longitude = response.loc.split(',')[1];
        }, "jsonp").done(function() {
            console.log('Option 3 worked = lat: ' + latitude + ' ' + 'lon: ' + longitude);
            showPosition();
        }).fail(function() {
            console.log("Option 3 didn't worked");
        });
    }
    
    // SHOW VALUES
    function showPosition() {
        x.html("<li>latitude: " + latitude + "</li><li>longitude: " + longitude + "</li>");
    }

    return {
        init: init
    };

})(jQuery);

holiday.party.init();