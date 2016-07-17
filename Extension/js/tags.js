var getFromMongo = function(callback)
{
    var URL =  "http://localhost:8080/NoteX/api";
    var params = "req=getCollections";
    var hr = new XMLHttpRequest();
    hr.open("POST",URL,true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.ontimeout = function () {
        callback("");
    };
    hr.onreadystatechange = function(){
        if(hr.readyState == 4 && hr.status == 200){
  		callback(hr.responseText);
    }
    
    };
    hr.send(params);

}  
  var getTags = function(callback){
  
     getFromMongo(function(data){
     s = data.split(",");
     	     sub =["python","database","chrome","protocol","html","php","xml","cassandra","jsp","json","math","equation",
    "javascript","math","network","meaning","Synonyms","dictionary","java","django","tech","windows","hadoop",
    "jquery","mysql","linux","ubuntu","operating","database","android","data","cobol","basic","ruby","mongodb",
    "angular","css","node","swift","oracle","git","apache","matlab","scala","bash","sqlite","cloud","aws","azure","jsf"," c "];
      callback(s.concat(sub));
     })
 
 }
