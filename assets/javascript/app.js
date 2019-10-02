var queryURL = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "api_key=taCRnzujm9m5i5KyZNgh5SQFno2PwGd8";
var query = "&q=";
var limit = "&limit=25";
var offset = "&offset=0";
var rating = "&rating=G";
var lang = "&lang=en";
var imageCount = 25;

var requestObj = queryURL + apiKey + query + limit + offset + rating + lang; 
var gifs = ["pikachu", "Michael Jordan", "Puppy", "Tree"];

function displayGifInfo(){
    var gif = $(this).attr("data-name");
    var requestObj = queryURL + apiKey + query + gif + limit + offset + rating + lang; 
    $.ajax({
        url: requestObj,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        for(i=0;i<imageCount;i++){
            var gridCol = $("<div>")
            gridCol.attr("class", "col-3");
        
            var cardDiv = $("<div>");
            cardDiv.attr("class", "card");

            var cardBodyDiv = $("<div>");
            cardBodyDiv.attr("class", "card-body");
            
            var gifImage = $("<img>");
            gifImage.attr("src", response.data[i].images.fixed_width.url) ;
            gifImage.attr("class", "gifImage card-img-top");
            gifImage.attr("data-still", response.data[i].images.fixed_width_still.url);
            gifImage.attr("data-animate", response.data[i].images.fixed_width.url);
            gifImage.attr("data-state", "animate");
            
            var cardTitle = $("<h5>");
            cardTitle.attr("class", "card-title");
            cardTitle.text(response.data[i].title);

            var cardText = $("<p>");
            cardText.attr("class", "card-text");
            cardText.text("rated: " + response.data[i].rating);

            cardBodyDiv.append(gifImage);
            cardBodyDiv.append(cardTitle);
            cardBodyDiv.append(cardText);
            cardDiv.append(cardBodyDiv);
            gridCol.append(cardDiv);

            $("#gif-container").prepend(gridCol);
        }
       
      });
}

function renderButtons() {
    $("#buttons-view").empty();
    for (i = 0; i < gifs.length; i++) {
        var a = $("<button>");
        a.attr("class", "btn btn-light");
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

//because this is assigned after element image exsists, therefore binding click event to document
$(document).on("click", ".gifImage", function(){
    var state = $(this).attr("data-state");
if(state === "still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
}
else if (state ==="animate"){
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
}
})

renderButtons();
