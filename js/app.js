$(".spin").hide();
$(function () {

    var cb = new Codebird;
    cb.setConsumerKey("QYaPv9WJcuWDDggISaFwqYomC", "mhOqMLBKtK6Z7AhEFOuHd3cFWMB9KbSbe5fUKTu1LoyHaCkPsn");

    $(".download").click(function (e) {

        e.preventDefault();

        setInterval(startProcess(),30000,function () {
            alert("TimeOut");
        });

    });

    function startProcess(){

        var tweet_url = $(".tweet-url").val();
        var s_url=tweet_url.split("/")[5];
        if (s_url==undefined){
            // $(".tweet-input").addClass("has-error");
            alert("Enter the tweet url correctly");
        }
        else {
            $(".spin").show();
            getVideoUrl(s_url);
        }
    }

    function getVideoUrl(s_url) {


        cb.__call(
            "statuses_show_ID",
            "id="+s_url,
            null, // no callback needed, we have the promise
            true // app-only auth
        ).then(function (data) {
                var i=0;
                var video_url=data.reply.extended_entities.media[0].video_info.variants[i].url;
                while (!video_url.endWith(".mp4")){
                    video_url=data.reply.extended_entities.media[0].video_info.variants[i].url;
                    i=i+1;
                }
                alert(video_url);
                download(video_url);
            },
            function (err) {
                $(".spin").hide();
                alert(err);
            });
    }


    function download(video_url) {

            $('<a/>',{
                "href":video_url,
                "download":"video.mp4",
                id:"videoDownloadLink"
            }).appendTo(document.body);
            $('#videoDownloadLink').get(0).click();

            $(".spin").hide();

    }
});

// https://twitter.com/Yadomah/status/848964543334285312
