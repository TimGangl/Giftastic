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
    renderButtons();
    //getting info from giphy api
    function displayMusicInfo() {
        var topic = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?&limit=10&q=" + topic + "&apikey=0zZILNFM54RkhIOwIgD8PJ7wXBK1APDd";
        $("#display-box").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var responseData = response.data;
            for (i = 0; i < responseData.length; i++) {
                var musicView = $("<div>").addClass("music-view d-inline-block p-3");
                var musicDiv = $("<img>").addClass("music-div");
                var pOne = $("<p>").text("Rating: " + responseData[i].rating);
                var imgStore = responseData[i].images.fixed_height_still.url;
                musicDiv.attr("src", imgStore);
                musicDiv.attr("data-animate-img", responseData[i].images.fixed_height.url);
                musicDiv.attr("data-still-img", imgStore);
                musicDiv.attr("data-go", false);
                musicView.append(musicDiv);
                musicView.append(pOne);
                $("#display-box").append(musicView);
            }
        });

    }
    function animate() {
        if ($(this).attr("data-go") === false) {
            $(this).attr("src", $(this).attr("data-animate-img"))
            $(this).attr("data-go", true)
        } else {
            $(this).attr("src", $(this).attr("data-still-img"))
        } $(this).attr("data-go", false)

    }

    $("#add-music").on("click", function (event) {
        event.preventDefault();
        var topic = $("#music-input").val().trim();
        topics.push(topic);
        renderButtons();
    });
    $(document).on("click", ".music-btn", displayMusicInfo);
    $(document).on("click", ".music-view", animate);

});