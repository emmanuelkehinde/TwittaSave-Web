$(function () {

// Enable Tooltip
    $('[data-toggle="tooltip"]').tooltip();


    var fetched = false;
    var cb = new Codebird;
    cb.setConsumerKey("KEY", "SECRET");


    $(".download-form").submit(function (e) {

        e.preventDefault();
        startProcess()

    });

    function startProcess() {

        var tweet_url = $(".tweet-url").val();
        var s_url = tweet_url.split("/")[5];
        if ((tweet_url.indexOf("twitter.com") == -1) || s_url == undefined) {
            $(".tweet-input").addClass("has-warning");
            $("#noti-text").text("Enter a correct tweet url.");
            showNoti(true);
            showSpin(false);
        }
        else {
            $(".tweet-input").removeClass("has-warning");
            showSpin(true);
            showNoti(false);
            fetched = false;

            getVideoUrl(s_url);
        }
    }

    function getVideoUrl(s_url) {

        cb.__call(
            "statuses_show_ID",
            "id=" + s_url,
            null, // no callback needed, we have the promise
            true // app-only auth
        ).then(function (data) {
            console.log(data);
            var i = 0;
            var video_url;
            if (data.reply.extended_entities == null && data.reply.entities.media == null) {
                $("#noti-text").text("The tweet contains no video or gif file (or it is not accessible).");
                showNoti(true);
                showSpin(false);
                fetched = true;
            }
            else if ((data.reply.extended_entities.media[0].type) != "video" && (data.reply.extended_entities.media[0].type) != "animated_gif") {
                $("#noti-text").text("The tweet contains no video or gif file (or it is not accessible).");
                showNoti(true);
                showSpin(false);
                fetched = true;

            } else {

                video_url = data.reply.extended_entities.media[0].video_info.variants[i].url;

                while (!video_url.match(".mp4$")) {
                    video_url = data.reply.extended_entities.media[0].video_info.variants[i].url;
                    i = i + 1;
                }
                download(video_url);

            }
        }).catch(
            function (err) {
                $("#noti-text").text("Unable to fetch tweet, check your internet connection");
                showNoti(true);
                showSpin(false);
                console.log(err);
            });
    }


    function download(video_url) {

        $('<a/>', {
            "href": video_url,
            "download": "video.mp4",
            id: "videoDownloadLink"
        }).appendTo(document.body);
        $('#videoDownloadLink').get(0).click();
        $('#videoDownloadLink').remove();
        fetched = true;
        showSpin(false);
    }

    function showSpin(tf) {
        if (tf == true) {
            $(".spin").prop("hidden", false);
        } else {
            $(".spin").prop("hidden", true);
        }
    }

    function showNoti(tf) {
        if (tf == true) {
            setTimeout(function () {
                $(".noti").prop("hidden", false);
            }, 500);
        } else {
            $(".noti").prop("hidden", true);
        }
    }

});
