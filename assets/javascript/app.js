
$( document ).ready(function() {


var animalArray = ["dog","cat","rabbit","hamster","rat","mouse","gerbil","capybara","chicken","pikachu","hamtaro","ferret"]


function renderButtons() {

        
        $("#animalButtons").empty();

        
        for (var i = 0; i < animalArray.length; i++) {

          
          var a = $("<button>");
          
          a.addClass("animals");
          
          a.attr("data-name", animalArray[i]);
         
          a.text(animalArray[i]);
          
          $("#animalButtons").append(a);
        }
      }

       $("#add-animal").on("click", function(event) {
        
        event.preventDefault();
        
        var animal = $("#animal-input").val().trim();

        animalArray.push(animal);
        
        renderButtons();

      });

       $(document).on("click", ".animals",  function() {
      
      var animal = $(this).attr("data-name");

      
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=TCXcbMxbOFU6qpJQnzWmEAKfnS5PxpSS&limit=10";

      
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        
        .done(function(response) {
         
          var results = response.data;

        $("#imageGoHere").empty();
          
          for (var i = 0; i < results.length; i++) {

            
            var animalDiv = $("<div class='picture'>");

            
            var p = $("<p>").text("Rating: " + results[i].rating);

            
            var animalImage = $("<img>");
            
            animalImage.attr("src", results[i].images.fixed_height_still.url);

            animalImage.attr("data-still", results[i].images.fixed_height_still.url );

            animalImage.attr("data-animate", results[i].images.fixed_height.url );

            animalImage.attr("data-state", "still" );

            
            animalDiv.append(p);
            animalDiv.append(animalImage);

            
            $("#imageGoHere").prepend(animalDiv);
          }
        });
    });

$(document).on("click", "img", function() {
     
      var state = $(this).attr("data-state");
     
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });




renderButtons();

});
