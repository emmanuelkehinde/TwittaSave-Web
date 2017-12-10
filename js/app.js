

$(function () {

// Enable Tooltip
    $('[data-toggle="tooltip"]').tooltip(); 


    var fetched=false;
    var cb = new Codebird;
    cb.setConsumerKey("[KEY]", "[SECRET]");
    
    $(".download-form").submit(function (e) {

        e.preventDefault();
        startProcess()

    });

    function startProcess(){

        var tweet_url = $(".tweet-url").val();
        var s_url=tweet_url.split("/")[5];
        if ((tweet_url.indexOf("twitter.com") == -1) || s_url==undefined){
            $(".tweet-input").addClass("has-warning");
            $("#noti-text").text("Enter a correct tweet url.");
            showNoti(true);
            showSpin(false);
        }
        else {
            $(".tweet-input").removeClass("has-warning");
            showSpin(true);
            showNoti(false);
            fetched=false;

            getVideoUrl(s_url);

            // setTimeout(function () {
            //     if (fetched==false) {
            //         try{
            //             window.stop();
            //         }catch(exception) {
            //             document.execCommand('Stop');
            //         }
            //
            //         $("#noti-text").text("Unable to fetch tweet, check your internet connection");
            //         showNoti(true);
            //         showSpin(false);
            //     }
            // },180000);
        }
    }

    function getVideoUrl(s_url) {
        // var url="https://api.twitter.com"+"/oauth2/token";
        // var data={};
        // // data.grant_type="client_credentials";
        // $.ajax({
        //     url: url,
        //     type:"POST",
        //     method:"POST",
        //     dataType: "json",
        //     crossDomain:true,
        //     contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        //     // data: JSON.stringify(data),
        //     cache: false,
        //     xhrFields: {
        //         withCredentials: false
        //     },
        //     beforeSend: function (xhr) {
        //         /* Authorization header */
        //         xhr.setRequestHeader("Authorization", "Basic " + encodedString);
        //         // xhr.setRequestHeader("X-Mobile", "false");
        //
        //     },
        //     success: function (data) {
        //         console.log(data);
        //         showSpin(false);
        //     },
        //     error: function (jqXHR, textStatus, errorThrown) {
        //         console.log(errorThrown);
        //         showSpin(false);
        //     }
        // });

        cb.__call(
            "statuses_show_ID",
            "id="+s_url,
            null, // no callback needed, we have the promise
            true // app-only auth
        ).then(function (data) {
                var i=0;
                var video_url;
                if (data.reply.extended_entities==null && data.reply.entities.media==null){
                    $("#noti-text").text("The tweet contains no video or gif file (or it is not accessible).");
                    showNoti(true);
                    showSpin(false);
                    fetched = true;
                }
                else if((data.reply.extended_entities.media[0].type)!="video" && (data.reply.extended_entities.media[0].type)!="animated_gif"){
                    $("#noti-text").text("The tweet contains no video or gif file (or it is not accessible).");
                    showNoti(true);
                    showSpin(false);
                    fetched = true;

                }else{

                    video_url= data.reply.extended_entities.media[0].video_info.variants[i].url;

                    while (!video_url.match(".mp4$")){
                        video_url=data.reply.extended_entities.media[0].video_info.variants[i].url;
                        i=i+1;
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

            $('<a/>',{
                "href":video_url,
                "download":"video.mp4",
                id:"videoDownloadLink"
            }).appendTo(document.body);
            $('#videoDownloadLink').get(0).click();
            $('#videoDownloadLink').remove();
            fetched = true;
            showSpin(false);
    }

    function showSpin(tf) {
        if (tf==true){
            $(".spin").prop("hidden", false);
        }else{
            $(".spin").prop("hidden", true);
        }
    }

    function showNoti(tf) {
        if (tf==true){
            $(".noti").prop("hidden", false);
        }else{
            $(".noti").prop("hidden", true);
        }
    }

});

// https://twitter.com/Yadomah/status/848964543334285312
