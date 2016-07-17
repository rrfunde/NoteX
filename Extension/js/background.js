


var sub,title,url,text,subject = "";
/*
var getTags = function(){

   //************** getting subjects
    var URL = "http://feelmagic.xyz/notex/api/tagNames.php";
    var hr = new XMLHttpRequest();
    hr.open("GET",URL,true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.ontimeout = function () {
        console.error("The request for " + URL + " timed out.");
    };
    hr.onreadystatechange = function(){
        if(hr.readyState == 4 && hr.status == 200){
            sub = hr.responseText.split(',');
        }else{
            sub = ["python","database","chrome","protocol","HTML","php","Mongodb","xml","cassandra","jsp","json","math","equation","JavaScript","math","network","meaning","Synonyms","dictionary","java","django","tech","windows","hadoop","jquery","mysql","linux","ubuntu","operating","database"," c ","android","data","cobol","basic","ruby"];
        }

    };
    hr.send();
};

*/

var formFill = function(){

  //  getTags();
     sub =["python","database","chrome","protocol","html","php","xml","cassandra","jsp","json","math","equation",
    "javascript","math","network","meaning","Synonyms","dictionary","java","django","tech","windows","hadoop",
    "jquery","mysql","linux","ubuntu","operating","database","android","data","cobol","basic","ruby","mongodb",
    "angular","css","node","swift","oracle","git","apache","matlab","scala","bash","sqlite","cloud","aws","azure","jsf"," c "];
    
    chrome.tabs.executeScript(null,{file:"js/getSelection.js"},function(response){
        document.getElementById("editor").innerHTML = response;
        document.getElementById("text").innerHTML=response;

    });

    chrome.tabs.query({active: true,
        currentWindow: true
    }, function (tabs) {

        var activeTab = tabs[0];

        title = activeTab.title;
        url = activeTab.url;


        var length = sub.length;

        for(var i = 0; i<length ;i++){
            if(title.toLowerCase().indexOf(sub[i]) > -1){
                subject = sub[i];
                break;
            }
        }
        if(subject == "") 
        {
            subject = "other";
        }

        chrome.storage.local.get("Title", function (res) {

            var titleSet = "";
            if (res.Title == "")
                titleSet = subject;
            else {
                titleSet = res.Title;
                document.getElementById("keepTitle").checked = true;

            }
            document.getElementById("title").value = titleSet;
        });
        chrome.storage.local.get("Topic", function (res) {
            var topicSet = "";

            if (res.Topic == "")
                topicSet = title;
            else {
                topicSet = res.Topic;
                document.getElementById("keepTopic").checked = true;
            }
            document.getElementById("topic").value = topicSet;
        });
        document.getElementById("linkText").innerHTML = url;
    })
};

var copyInnerHtml = function () {

    document.getElementById("text").innerHTML = document.getElementById("editor").innerHTML;
};

formFill();

var ele = document.getElementById('form1');
if (ele.addEventListener) {
    ele.addEventListener("submit", copyInnerHtml, false);  //Modern browsers
}

document.getElementById("keepTopic").addEventListener("change", titleCheck);
document.getElementById("keepTitle").addEventListener("change", subCheck);


function subCheck()   // if user chooses to store subject for future browsing
{


    var c = document.getElementById("keepTitle").checked;

    if (c == true) {

        var obj1 = {};
        obj1["Title"] = document.getElementById("title").value;
        chrome.storage.local.set(obj1, function () {
        })
    }
    else
        chrome.storage.local.set({Title: ""}, function () {
        })

}
function titleCheck()                     // if user chooses to store title for future browsing
{
    if (document.getElementById("keepTopic").checked) {
        var obj = {};
        obj["Topic"] = document.getElementById("topic").value;
        chrome.storage.local.set(obj, function () {
        })
    }
    else
        chrome.storage.local.set({Topic: ""}, function () {
        })
}

