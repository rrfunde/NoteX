$(document).ready(function() {
    $(function () {
        $(window).scroll(function () {
            var winTop = $(window).scrollTop();
            if (winTop >= 30) {
                $("body").addClass("sticky-header");
            } else {
                $("body").removeClass("sticky-header");
            }//if-else
        });//win func.
    });//ready func.
});


addCollection=function()
{
    var Collection = prompt(" enter new subject name");
    if (Collection != null) {
        //  AJax Request
        var hr = new XMLHttpRequest();
        // Create some variables we need to send to our PHP file
        var url = "http://localhost:8080/NoteX/api";
        var params= "Collection="+Collection + "&req=new";
        hr.open("POST", url, true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Access the onreadystatechange event for the XMLHttpRequest object
        hr.onreadystatechange = function() {
            if(hr.readyState == 4 && hr.status == 200) {  // ajax request completed
                var return_data = hr.responseText;
                location.reload();
            }
        }
        // Send the data to PHP now... and wait for response to update the status div
        //  alert(params);
        hr.send(params);
// Done Ajax

    }
};




var clicked_id = 0;
var solution;


//	FUNCTION TO CONVERT DIV TO TEXTAREA
function clickEvent(clicked_id1, name1) {

    document.getElementById(clicked_id1).style.display = "none";
    var div = document.getElementById(name1);
    name= name1;
    clicked_id = clicked_id1;
    var divData = div.innerHTML;
    div.innerHTML = "";
    var input1 = document.createElement("textarea");
    var button1 = document.createElement("button");
    button1.className="waves-effect waves-light btn";
    button1.innerHTML = "Submit";
//input.name = "post";
    input1.innerHTML = divData;
    input1.maxLength = "5000";
   /* button1.className="serverSubmit";*/
    button1.name = "GO";
    input1.cols = "80";
    input1.rows = "40";
    input1.name = "input2";
    div.appendChild(input1); //appendChild
    div.appendChild(button1);


    tinymce.init({
        selector: "textarea",
        content_css: "content.css",
        force_br_newlines : true,
        force_p_newlines : false,
        forced_root_block : '',
        fontsize_formats: "8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt",
        statusbar: false,
        theme: "modern",
        removed_menuitems: "newdocument strikethrough ",
        plugins: [
            "advlist autolink lists link image  print  ",
            "searchreplace  code fullscreen autoresize",
            " media  save table contextmenu example ",
            "  paste textcolor colorpicker textpattern"
        ],

        toolbar1: " fontselect fontsizeselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist   | link image ",
        toolbar2: "undo redo | style-p style-h1 style-h2 style-h3 style-pre style-code",
        menubar: ' edit insert format ',

        image_advtab: true,

        setup: function (editor) {
            editor.addButton('mybutton', {
                text: 'My button',
                icon: false,
                onclick: function () {

                    editor.insertContent('Main button');
                    editor.body.style.fontSize = '24px';
                }
            });

            //
            editor.on('keydown', function (event) {
                if (event.keyCode == 9) { // tab pressed
                    if (event.shiftKey) {
                        editor.execCommand('Outdent');
                    }
                    else {
                        editor.execCommand('Indent');
                    }

                    event.preventDefault();
                    return false;
                }
            });

        }


    });

    //	BUTTON ONCLICK FOR GET TINYmce CONTENT
    button1.onclick = function(){

        var div=document.getElementById(name);

        var temp=tinyMCE.get('input2').getContent();
        //div.removeChild('input2');
        document.getElementById('input2').style.display = "none";

        div.innerHTML=temp;
        document.getElementById(clicked_id).style.display = "block";

        //	SEND DATA TO SERVER

        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        // alert(temp);
        var hr = new XMLHttpRequest();

        var url = "http://localhost:8080/NoteX/api";
        var subject = getParameterByName('name');
        var params= "id="+clicked_id+"&Collection="+subject+"&solution="+encodeURIComponent(temp)+"&req=EditServe";
        hr.open("POST", url, true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        hr.onreadystatechange = function() {
            if(hr.readyState == 4 && hr.status == 200) {
                var return_data = hr.responseText;
                //  alert(return_data);
            }
        }

        hr.send(params);
    }
}
