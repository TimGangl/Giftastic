$(document).ready(function () {
    //Topics array
    var topics = ["Jazz", "Funk", "Heavy Metal", "Hip-Hop", "Reggae"];
    //function to make buttons
    function renderButtons() {
        //makes button div empty
        $("#button-view").empty();
        //creates a button for each topic in array, adds class and attribute populate buttons in div
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("music-btn");
            a.attr("data-music-input", topics[i]);
            a.text(topics[i]);
            $("#button-view").append(a);

        }
    }

    //getting info from giphy api
    function displayMusicInfo() {
        var topic = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?&limit=10&q=" + topic + "&apikey=0zZILNFM54RkhIOwIgD8PJ7wXBK1APDd";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var responseData = response.data;
            for (i = 0; i < responseData.length; i++) {
                var musicDiv = $("<img>").addClass("music-div");
                var pOne = $("<p>").text("Rating: " + responseData[i].rating);
                $("#music-view").append(pOne);
                var imgStore = responseData[i].images.url;
                musicDiv.attr("src", imgStore);
                $("#music-view").append(musicDiv);
                $(".display-box").append($("#music-view"));
            }
        });

    }


    $("#add-music").on("click", function (event) {
        event.preventDefault();
        var topic = $("#music-input").val().trim();
        topics.push(topic);
        renderButtons();
    });
    $(document).on("click", ".music-btn", displayMusicInfo);
    renderButtons();

});