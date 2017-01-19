/**
 * Created by rohit on 12/7/16.
 */
var IMG_URL = ""
function genericOnClick(info, tab) {

 var title,solution = "",link,subject = "";
    var YOUTUBE = 0;                        // for handling youtube videos
    title = tab.title;
    link = tab.url;

   tags = document.createElement("script");
  tags.src = "js/tags.js";
  document.head.appendChild(tags);

  tags.onload = function(){
  getTags(title,function(sub){

    subject = sub;
    if(info.selectionText != undefined)
    {
        solution = info.selectionText;
    }


    if(info.linkUrl != undefined && info.linkUrl.indexOf("youtube") > -1 )
    {
        YOUTUBE = 1;
        url = info.linkUrl;
        // fetching title of youtube
        var index = url.indexOf("=");
        var videoId = url.substr(index + 1);
        var URL = "https://www.googleapis.com/youtube/v3/videos?id="+ videoId + "&key=AIzaSyDo9WX563HgvVKU4tku0sqe3lrcswnN5o0&fields=items(snippet(title))&part=snippet";
        var hr = new XMLHttpRequest();
        hr.open("GET",URL,true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        hr.onreadystatechange = function(){
            if(hr.readyState == 4 && hr.status == 200){

                title = JSON.parse(hr.responseText).items[0].snippet.title;
                solution += "<br />" + "<iframe src=\"https://www.youtube.com/embed/" + videoId + "\" width=\"640\" height=\"360\" allowfullscreen=\"allowfullscreen\"></iframe>";
                link = url;
                topic = "Youtube";
                saveData(title,topic,solution,link);
            }


        };
        hr.send();
    }
    else if(info.linkUrl != undefined && YOUTUBE == 0)     // Handle hyper links
    {
        if( info.linkUrl.indexOf("vimeo") > -1)
        {
            solution += "<br />" + "<iframe src=\"" +info.linkUrl + "\" width=\"560\" height=\"314\" allowfullscreen=\"allowfullscreen\"></iframe>";
        }
        else if(info.linkUrl.indexOf("slideshare") > -1)
        {
            // @todo sildeshare embed
        }
        else
        {
            link = info.linkUrl;
        }
        saveData(title,subject,solution,link);
    }
   else if(info.mediaType != undefined && YOUTUBE == 0)
    {


        if(info.mediaType.indexOf("image") > -1 )
        {
                solution += "<img src=\"" + info.srcUrl + "\"></img>";
                IMG_URL = info.srcUrl;

        }
        else if(info.mediaType.indexOf("video") > -1)
        {
                solution += "<br />" + "<video width=\"640\" height=\"360\" controls>" +
                        "<source src=\"" +info.srcUrl + "\" type=\"video/mp4\"></video>";

        }
        else if(info.mediaType.indexOf("audio") > -1)
        {
                solution += "<audio controls> <source src=\"" + info.srcUrl +"\" type=\"audio/mpeg\"></audio>";
        }

        saveData(title,subject,solution,link);
    }
    else
    {
    		saveData(title,subject,solution,link);
    }

  });
  }
  }


var id = chrome.contextMenus.create({"title": "save to NoteX", "contexts":["all"],
    "onclick": genericOnClick});



var saveData = function(title,subject,solution,url)
{

    var URL = "http://localhost:8080/NoteX/api";
    var hr = new XMLHttpRequest();

    hr.open("POST",URL,true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

       chrome.storage.local.get("Title", function (res) {

            if (res.Title != "")
                subject = res.Title;

	 chrome.storage.local.get("Topic", function (res) {
            if (res.Topic != "")
                title = res.Topic;

     var params = "title=" + subject + "&topic=" + title + "&text=" + solution + "&linkText=" + url + "&req=addDocument";

    hr.onreadystatechange = function(){
        if(hr.readyState == 4 && hr.status == 200){
        var opt;
        notifyMe()
        if(IMG_URL == ""){
                  opt = {
                            type: "basic",
                            title: "Added to ",//+subject,
                            message: "sample",//title,
                            expandedMessage: "Longer part of the message",
                            iconUrl: chrome.runtime.getURL("images/added.png")
                        };
         } else {
                             opt = {
                            type: "image",
                            title: "Added to ",//+subject,
                            message: "sample",//title,
                            iconUrl: chrome.runtime.getURL("images/added.png"),
                            imageUrl: IMG_URL
                        };
                        IMG_URL = "";
                        }
                        //notification =
                        // chrome.notifications.create("sampleName",opt,{});
                        //Notification.display(opt);

        }
    };
    hr.send(params);
        });
        });
};
      // var Notification = (function () {
      //           var notification = null;
      //           return {
      //               display: function (opt) {
      //                   notification = chrome.notifications.create("sampleName",opt);
      //                   notification.show();
      //               },
      //               hide: function () {
      //                   notification.close();
      //               }
      //           };
      //       })();


      document.addEventListener('DOMContentLoaded', function () {
        if (!Notification) {
          alert('Desktop notifications not available in your browser. Try Chromium.');
          return;
        }

        if (Notification.permission !== "granted")
          Notification.requestPermission();
      });

      function notifyMe() {
        if (Notification.permission !== "granted")
          Notification.requestPermission();
        else {
          var notification = new Notification('Notification title', {
            icon: chrome.runtime.getURL("images/added.png"),
            body: "Hey there! You've been notified!",
          });

          notification.onclick = function () {
            window.open("http://stackoverflow.com/a/13328397/1269037");
          };

        }

      }
