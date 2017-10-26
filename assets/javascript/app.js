(function () {
   'use strict';
}());

$(function() {
	    populateButtons(movies, 'movieButton', '#movieButtons');

});

//array of movies
var movies = ["Fast Times","Ghostbusters","Groundhog Day"];

function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }

}

$(document).on('click','.movieButton', function(){
    $('#addmovie').removeClass('active');
    $(this).addClass('active');
	
//giphy api and data type
    var type = $(this).data('type');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=pjs8fsyl0bXEKTWctVdFKq1AP4oIK3n3&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
         var results = response.data;

		//Sets the rating for giphy. 
         for(var i=0; i < results.length; i++){
             var movieDiv = $('<div class="movie-item">');
             var rating = results[i].rating;
             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var movieImage = $('<img>');
             movieImage.attr('src', still);
             movieImage.attr('data-still', still);
             movieImage.attr('data-animate', animated);
             movieImage.attr('data-state', 'still');
             movieImage.addClass('movieImage');
             movieDiv.prepend(p);
             movieDiv.prepend(movieImage);

             $('#movies').prepend(movieDiv);
         }
});
});

//plays the gif upon clicking
$(document).on('click', '.movieImage', function(){
    var state = $(this).attr('data-state'); 
    
    if ( state === 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

//adds new movie by user
//This part of the code doesn't work. :/ SHAME. SHAME. SHAME. SHAME. SHAME. 
 
$('#addmovie').on('click', function(){
    var newmovie = $('input').eq(0).val();
	
    if (newmovie.length > 2){
        movies.push(newmovie);
    }

	populateButtons(movies,'movieButton','#movieButtons');
	
    return false;

});
