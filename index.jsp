<%@page import="com.mongodb.DBCollection"
        import="com.mongodb.MongoClient"
        import="com.mongodb.client.MongoCursor"
        import="org.bson.Document"
        import="com.mongodb.client.FindIterable"
        import="com.mongodb.DB"
        import="com.mongodb.client.*"
        import="com.mongodb.client.MongoDatabase"

%>

<html>
    <head>
        <title class="title">
            <%
                String title = request.getParameter("name");
                if(title == null)
                 out.print(" NoteX Home");
                else
                 out.print(title + "- NoteX");
            %>
        </title>


    </head>

    <body>

    <script type="text/javascript" src="tinymce/js/tinymce/tinymce.min.js"></script>
    <link rel="stylesheet" href="css/highlight.css">
    <script src="js/highlight.min.js"></script>
    <link rel="stylesheet" href="css/materialize.min.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <script>hljs.initHighlightingOnLoad();</script>
    <link rel="shortcut icon" type="image/png" href="icon.png"/>
    <link rel="stylesheet" type="text/css" href="content.css">
    <script src="script.js"></script>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    </head>

    <div class="navbar-fixed center">
        <nav>
            <a href="index.jsp" class="brand-logo"><h1 >NoteX<br></h1></a>

        </nav>
    </div>

    <div class="row-offcanvas row-offcanvas-left">
        <div id="sidebar" class="sidebar-offcanvas">
            <div class="col-md-12">
                <h3>&nbsp;&nbsp;Subject&nbsp;&nbsp;&nbsp; <a onclick="addCollection()" class="btn-floating  waves-effect waves-light red"><i class="mdi-content-add"></i></a>
                </h3>
                <ul class="nav nav-pills nav-stacked" id="subjectList">
                        <%!


                                MongoClient mongoClient = new MongoClient();
                                MongoDatabase mongoDatabase = mongoClient.getDatabase("NoteX");
                                int idNo = 0;
                         %>

                         <%
                                MongoIterable<String> collectionNames = mongoDatabase.listCollectionNames();
                                for(String collection: collectionNames){
                                    if(collection.startsWith("system.") == false){
                                        out.print(" <li><a class='collection-item' href='index.jsp?name="+collection+"\' id=\'"+
                                       collection +"\'>" + collection + "</a></li> ");
                                    }
                                }
                        %>
                </ul></div></div></div></div>

                <div class="wrapper">
                <%
                	
                	if(request.getParameter("name") != null)
                	{
                             MongoCollection<Document> collection = mongoDatabase.getCollection(request.getParameter("name"));
                             MongoCursor<Document> cursor = collection.find().iterator();
                             try {
                                while (cursor.hasNext()) {

                                 Document doc = cursor.next();

                                 out.print("<section ><h4><b>" + doc.get("problem") + "</b></h4><div id=\"" + idNo +
                                    "\"><p>"  +doc.get("solution") + "</p></div><a href =\'" + doc.get("link") +
                                    "\'>"+doc.get("link")+ "</a> <h4 class='right-align'><a style='' class='waves-effect waves-light btn ' " +
                                    "id=\"" + doc.get("_id") + "\" name=\"" + idNo + "\" onClick=clickEvent(this.id,this.name) >Edit\n" +
                                    "</a></h5></section>");
                                    idNo++;
                                }
                              } finally {
                                cursor.close();
                              }
                          }    
                %>
               </div>
    </body>
</html>
