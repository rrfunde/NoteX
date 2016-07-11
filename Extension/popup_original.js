/**
 * Created by happy on 4/2/16.
 */

var tablink, title1, head1, word, mytitle, textData;
var sub = ["python","database","chrome","protocol","HTML","php","Mongodb","xml","cassandra","jsp","json","math","equation","JavaScript","math","network","meaning","Synonyms","dictionary","java","django","tech","windows","hadoop","jquery","mysql","linux","ubuntu","operating","database"," c ","android","data","cobol","basic","ruby"];


function subCheck()
{

    var c=document.getElementById("keepSub").checked;

    if(c===true) {

        var obj = {"Subject":document.getElementById("title").innerText}
        chrome.storage.local.set(obj,function(){})
    }
    else
        chrome.storage.local.set({"Subject":""},function(){})

}
function titleCheck()
{
    if(document.getElementById("keepTitle").checked) {
        var obj = {"Title":document.getElementById("topic").value};
        chrome.storage.local.set(obj, function () {
        })
    }
    else
        chrome.storage.local.set({"Subject":""},function(){})
}
chrome.tabs.getSelected(null,function(tab) {



    tablink = tab.url;
    title1 = tab.title;
    title2 = title1;
    re0 = new RegExp('-', 'i');
    var i = title1.lastIndexOf('-');
    if (i > -1) {
        title1 = title1.substring(0, i);
    }
    i = title1.indexOf('is');
    if (i > -1) {
        title1 = title1.substring(i + 3, title1.length);
    }
    document.getElementById("topic").value = title1;
    var v1;
    /*************************************finding subject**************************************/
    var count;
    var re1;
    for (count = 0; count < sub.length; count++) {
        re1 = new RegExp(sub[count], 'i');

        if (title2.match(re1)) {

            mytitle = sub[count];
            if (mytitle == "operating") {
                mytitle = "linux";
            }
            else if (mytitle == "protocol") {
                mytitle = "network";
            }
            else if (mytitle == "equation") {
                mytitle = "math";
            }

            else if (mytitle == "data") {
                mytitle = "database";
            }
            else if (mytitle == "meaning" || mytitle == "dictionary" || mytitle == "Synonyms") {

                mytitle = "dictionary";



                var a = title1.indexOf(" ");
                var word1 = title1.substring(0, a);


                break;
            }


//	else{
//document.getElementById("textareasub").innerHTML=sub[count];
            document.getElementById("title").innerHTML = mytitle;




            chrome.tabs.executeScript( {
                    code: "window.getSelection().toString();"
//code: "content.window.getSelection();"

                }, function(selection) {
                    document.getElementById("text").innerHTML = selection[0];
                    textData=selection[0];
                    //  var s=getSelectionHtml();
//document.getElementById("t1").innerHTML = s;


                }
            );
// Run
            document.getElementById("linkText").innerHTML = tablink;
//}
            break;
        }
        else {

            var cookie = "";
            chrome.storage.local.get("Subject", function (session) {
                cookie=session.Subject;
            });
            if(cookie!=="")
                document.getElementById("title").innerHTML = cookie;
            else
                document.getElementById("title").value="other";//"other";
            document.getElementById("linkText").innerHTML = tablink;
        }
    }


    chrome.tabs.executeScript( {
            code: "window.getSelection().toString();"
//code: "content.window.getSelection();"

        }, function(selection) {
            document.getElementById("text").innerHTML = selection[0];
            textData=selection[0];
            //  var s=getSelectionHtml();
//document.getElementById("t1").innerHTML = s;


        }
    );
    document.addEventListener('DOMContentLoaded', function () {

        document.getElementById("linkText").innerHTML=tablink;
        document.getElementById("text").innerHTML=textData;

    });

});

