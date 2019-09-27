
//https://api.giphy.com/v1/gifs/search?api_key=taCRnzujm9m5i5KyZNgh5SQFno2PwGd8&q=basketball&limit=25&offset=0&rating=G&lang=en


var queryURL = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "api_key=taCRnzujm9m5i5KyZNgh5SQFno2PwGd8";
var query = "&q=basketball";
var limit = "&limit=25";
var offset = "&offset=0";
var rating = "&rating=G";
var lang = "&lang=en";

var requestObj = queryURL + apiKey + query + limit + offset + rating + lang; 
var gifs = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

    $.ajax({
      url: requestObj,
      method: "GET"
    }).then(function(response) {
     console.log(response);
    });
    
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

    renderButtons();
