
var sub,title,url,text,subject = "";

var formFill = function(){

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
        
        getTags(title,function(s){
            
            subject = s;
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
        });
    });
};

var copyInnerHtml = function () {

    document.getElementById("text").innerHTML = document.getElementById("editor").innerHTML;
};



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


var ele = document.getElementById('form1');
if (ele.addEventListener) {
    ele.addEventListener("submit", copyInnerHtml, false);  //Modern browsers
}
document.getElementById("keepTopic").addEventListener("change", titleCheck);
document.getElementById("keepTitle").addEventListener("change", subCheck);
formFill();
