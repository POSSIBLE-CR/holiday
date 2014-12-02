/*
The click event in temporal. You must change it for the real trigger of the profanity event.
Any doubt please contact K.Brenes.
*/
$( "#check_profanity" ).click(function() {
    var myText = $('#element1').html();    
    //where is the #element1 text? You must get it form the html or the place that contains the messages
    /*
    <ul>
        <li id="element1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Mauris ultricies fermentum turpis, eget imperdiet leo feugiat vehicula. Etiam 
        id nisl quis sapien gravida volutpat eu eu sapien. Mauris pulvinar ac cum san 
        orci eget iaculis. Nam ornare, odio et dapibus varius, turpis nunc auctor enim, 
        non suscipit eros velit at enim. Nulla blandit nisi libero, sed maximus eros 
        finibus id. Sed eget magna vitae felis semper efficitur. Donec porta urna nec 
        eros efficitur convallis. Fusce sodales vitae purus quis pellentesque. Fusce ut 
        enim dignissim, malesuada leo quis, pretium tellus. Fusce bibendum, nibh sed porta 
        rhoncus, diam justo pulvinar nibh, vel viverra elit tellus quis arcu. Maecenas
         euismod mauris enim, quis tristique metus commodo quis. Donec scelerisque mi eget 
         odio semper bibendum.</li>
    </ul>
    */

    var jqxhr = $.getJSON( "json/en.json", null, function(data) {// read the json with the "bad" words.
    
        var profanities = fillSelect(data);

        if(containsProfanity(myText,profanities)){// is true, there are any bad word in the message, 
            //for ilustrative purpose the example just display a message
            $('#result').html('That language is profane dude.');
        }
        else{
            $('#result').html('That language is just fine.');
        }
    });
});

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
    
