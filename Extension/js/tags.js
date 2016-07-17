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


  var getTags = function(){
  
     sub =["python","database","chrome","protocol","html","php","xml","cassandra","jsp","json","math","equation",
    "javascript","math","network","meaning","Synonyms","dictionary","java","django","tech","windows","hadoop",
    "jquery","mysql","linux","ubuntu","operating","database","android","data","cobol","basic","ruby","mongodb",
    "angular","css","node","swift","oracle","git","apache","matlab","scala","bash","sqlite","cloud","aws","azure","jsf"," c "];
      return sub;   
 }
