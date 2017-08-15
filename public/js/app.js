

$(function () {

// Enable Tooltip
    $('[data-toggle="tooltip"]').tooltip(); 


    var fetched=false;
    var cb = new Codebird;
    cb.setConsumerKey("KEY", "SECRET");
    // var key = encodeURIComponent("QYaPv9WJcuWDDggISaFwqYomC");
    // var secret = encodeURIComponent("mhOqMLBKtK6Z7AhEFOuHd3cFWMB9KbSbe5fUKTu1LoyHaCkPsn");
    // var concat=key+":"+secret;
    //
    // // Create Base64 Object
    // var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    //
    // // Encode the String
    // var encodedString = Base64.encode(concat);


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
        		console.log(data);
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
