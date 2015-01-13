var holiday = holiday || {};

holiday.party = (function ($) {
    
    var x = $('#demo'),
        data        = null,
        countryName = null,
        city        = null,
        countryCode = null,
        profanity   = null,
        profanities_array = [],
        latitude    = null,
        longitude   = null;
    
    function init() {
        // DETECTING IF GEOLOCATION IS ACTIVATED
       
        navigator.geolocation.getCurrentPosition(allowLocation,deniedLocation);

        var profanities_array_es = [];
        $.getJSON( "../json/es.json", function(data) {
            profanities_array_es = fillSelect(data);
        });
        $.getJSON( "../json/en.json", function(data) {
            var profanities_array_en = fillSelect(data);
            profanities_array = profanities_array_en.concat(profanities_array_es);
        });

        return false;
        
    }
    
    // IF ALLOW
    function allowLocation(position){
        
        navigator.geolocation.getCurrentPosition(function(pos){
            latitude = pos.coords.latitude;
            longitude = pos.coords.longitude;
             $.getJSON('http://ws.geonames.org/countryCode', {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                username: 'possible',
                type: 'JSON'
            }, function(result) {
                countryName = result.countryName;
                countryCode = result.countryCode;
                console.log(countryCode);
                city = result.city;//not return anything for CostaRica
                $( "input:hidden[name=longitude]" ).val(longitude);
                $( "input:hidden[name=latitude]" ).val(latitude);
                $( "input:hidden[name=country]" ).val(countryName);
                $( "input:hidden[name=countryCode]" ).val(countryCode);
                $( "input:hidden[name=city]" ).val(city);
            });

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
    
    function fillSelect(data) {
        var profanities = new Array();
        $.each(data, function(i, item) {
            profanities.push(item);
        });
      return profanities;
    } 

    String.prototype.contains = function(str) { return this.indexOf(str) != -1; };
    
    var containsProfanity = function(text,profanities){
        var returnVal = false; 
        
        for (var i = 0; i < profanities.length; i++) {
            if(text.toLowerCase().contains(profanities[i].toLowerCase())){
                console.log(profanities[i].toLowerCase());
                returnVal = true;
                break;
            }
        }
        return returnVal;
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

    //Populata the field 'allowed/profanity' after check vs the json list.
    $(document).ready(function(){
        $('.addMessage').on('submit', function(event){
        //$( ".addMessage" ).submit(function( event ) {
            var myText =  $( ".text-message" ).val();

                if(containsProfanity(myText,profanities_array)){
                    $( "input:hidden[name=profanity]" ).val('false');
                }
                else{
                    $( "input:hidden[name=profanity]" ).val('true');
                }

                event.preventDefault();
                /*$config = array(
                    'oauth_access_token' => 'token-here',
                    'oauth_access_token_secret' => 'token-here',
                    'consumer_key' => 'token-here',
                    'consumer_secret' => 'token-here',
                    'use_whitelist' => true, // If you want to only allow some requests to use this script.
                    'base_url' => 'https://api.twitter.com/1.1/'
                );*/
console.log('quiza ');
        
                $.ajax({
                   type: "POST",
                   url: "api/messages",
                   data: $(this).serialize(),
                   success: function() {
                    console.log('ahora si');
                        window.location.replace("/map");
                   }
                });

                
        });
    });

    return {
        init: init
    };

})(jQuery);
holiday.party.init();
