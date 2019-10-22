$(document).ready(function () {
    //Topics array
    var topics = ["Jazz", "Funk", "Heavy Metal", "Hip-Hop", "Reggae"];

    function displayMusicInfo() {
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?=" + topics + "&apikey=0zZILNFM54RkhIOwIgD8PJ7wXBK1APDd";

        $ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var MusicDiv = $("<div class='music'>");
            var rating = response.Rated;
            var pOne = $("<p>").text("Rating: " + rating);
            MusicDiv.append(pOne);

        });

    }

    function renderButtons() {
        $("#button-view").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("music-btn");
            a.attr("music-input", topics[i]);
            a.text(topics[i]);
            $("#button-view").append(a);

        }
    }
    $("#add-music").on("click", function (event) {
        event.preventDefault();
        var topic = $("#music-input").val().trim();
        topics.push(topic);
        renderButtons();
    });
    $(document).on("click", "music-btn", displayMusicInfo);
    renderButtons();
});