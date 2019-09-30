
//https://api.giphy.com/v1/gifs/search?api_key=taCRnzujm9m5i5KyZNgh5SQFno2PwGd8&q=basketball&limit=25&offset=0&rating=G&lang=en


var queryURL = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "api_key=taCRnzujm9m5i5KyZNgh5SQFno2PwGd8";
var query = "&q=";
var limit = "&limit=25";
var offset = "&offset=0";
var rating = "&rating=G";
var lang = "&lang=en";

var requestObj = queryURL + apiKey + query + limit + offset + rating + lang; 
var gifs = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

function displayGifInfo(){
    var gif = $(this).attr("data-name");
    var requestObj = queryURL + apiKey + query + gif + limit + offset + rating + lang; 
    $.ajax({
        url: requestObj,
        method: "GET"
      }).then(function(response) {

        var $gif = $("<img>");
        $gif.attr("src", response.data[0].images.fixed_width.url) ;
        $gif.attr("class", "gifImage");
        $("#gif-container").prepend($gif);
        //Used within AJAX because of anyschrnous event outside will not work if called upon prior to creation.
        $(".gifImage").on("click", function(event){
            event.preventDefault();
            console.log("clicked");
        })
      });
}

function renderButtons() {
    $("#buttons-view").empty();
    for (i = 0; i < gifs.length; i++) {
        var a = $("<button>");
        a.addClass("gif");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    gifs.push(gif);
    renderButtons();
    });

$(document).on("click", ".gif", displayGifInfo);
renderButtons();
