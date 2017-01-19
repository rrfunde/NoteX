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
  var getTags = function(title,callback){

  Array.prototype.intersect = function(...a) {   //http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
  return [this,...a].reduce((p,c) => p.filter(e => c.includes(e)));
}
      sub =["python","database","chrome","protocol","html","php","xml","cassandra","jsp","json","math","equation",
      "javascript","math","network","meaning","Synonyms","dictionary","java","django","tech","windows","hadoop",
      "jquery","mysql","linux","ubuntu","operating","database","android","data","cobol","basic","ruby","mongodb",
      "angular","css","node","swift","oracle","git","apache","matlab","scala","bash","sqlite","cloud","aws","azure","jsf","c","ios"];
     getFromMongo(function(data){

     var s = data.split(",");
     sub = s.concat(sub);
     var rmSym = title.replace(/[^a-zA-Z ]/g, "");     //http://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript

     var t = rmSym.split(" ")
     var lowTitle = [];
     t.forEach(function(s){
     	lowTitle.push(s.toLowerCase());
     })
    var common = sub.intersect(lowTitle);
    var len = common.length;
    if(len >= 1)
    {
      if(common[0] != "") {
        subject = common[0];
    } else if(len > 1){
        subject = common[1];
      } else {
        subject = "other";
      }
    }
    else
    {
        subject = "other";
    }
      callback(subject);
     });
 }

// write function -> if tag match to other then only ask for mongo API
