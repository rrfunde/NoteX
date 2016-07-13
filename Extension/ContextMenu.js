/**
 * Created by rohit on 12/7/16.
 */

function genericOnClick(info, tab) {

    sub = ["python","database","chrome","protocol","HTML","php","Mongodb","xml","cassandra","jsp","json","math","equation","JavaScript","math","network","meaning","Synonyms","dictionary","java","django","tech","windows","hadoop","jquery","mysql","linux","ubuntu","operating","database"," c ","android","data","cobol","basic","ruby"];
    var title,solution = "",link,subject = "";
    var YOUTUBE = 0;                        // for handling youtube videos
    title = tab.title;
    link = tab.url;

    var len = title.length;

    for(var i = 0; i<len; i++)
    {
        if(title.indexOf(sub[i]) > -1)
        {
            subject = sub[i];
            break;
        }
    }

    if(subject == "")
    {
        subject = "other";
    }
    if(info.selectionText != undefined)
    {
        solution = info.selectionText;
    }


    if(info.linkUrl != undefined && info.linkUrl.indexOf("youtube") > -1)
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
    else if(info.mediaType == undefined && info.linkUrl != undefined && YOUTUBE == 0)
    {
        if( info.linkUrl.indexOf("vimeo") > -1)
        {
            solution += "<br />" + "<iframe src=\"" +info.linkUrl + "\" width=\"560\" height=\"314\" allowfullscreen=\"allowfullscreen\"></iframe>";
        }
        else if(info.linkUrl.indexOf("slideshare") > -1)
        {
            // @todo sildeshare embed
        }
    }
    if(info.mediaType != undefined && YOUTUBE == 0)
    {


        if(info.mediaType.indexOf("image") > -1 )
        {


        }
        else if(info.mediaType.indexOf("video"))
        {
                solution += "<br />" + "<video width=\"640\" height=\"360\" controls>" +
                        "<source src=\"" +info.srcUrl + "\" type=\"video/mp4\"></video>";

        }
        else if(info.mediaType.indexOf("audio"))
        {
            // @todo Audio
        }
        else if(info.mediaType != undefined)
        {
            // @todo handle unknown media types
        }
        saveData(title,subject,solution,link);
    }
}


var id = chrome.contextMenus.create({"title": "save to NoteX", "contexts":["all"],
    "onclick": genericOnClick});



var saveData = function(title,subject,solution,url)
{

    var URL = "http://localhost:8080/NoteX/store";
    var hr = new XMLHttpRequest();
    var params = "title=" + subject + "&topic=" + title + "&text=" + solution + "&linkText=" + url;
    hr.open("POST",URL,true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    hr.onreadystatechange = function(){
        if(hr.readyState == 4 && hr.status == 200){
         //   alert(hr.responseText);
        }


    };
    hr.send(params);
};
