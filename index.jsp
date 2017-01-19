<%@page import="com.mongodb.DBCollection"
        import="com.mongodb.MongoClient"
        import="org.bson.Document"
        import="com.mongodb.client.FindIterable"
        import="com.mongodb.DB"
        import="com.mongodb.client.*"
	import="com.mongodb.BasicDBObject"
	import="com.mongodb.DBObject"
	import="org.bson.conversions.Bson"
	import="com.mongodb.client.model.*"
%>
<%!

// creating global mongoclient object
    MongoClient mongoClient = new MongoClient();
    MongoDatabase mongoDatabase = mongoClient.getDatabase("NoteX");
    int idNo = 0;
%>
<html>
<head>
    <script src="tinymce/js/tinymce/tinymce.min.js"></script>
    <script src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/highlight.css">
    <script src="js/highlight.min.js"></script>
    <link rel="stylesheet" href="css/materialize.min.css">
    <link rel="stylesheet" href="css/ghpages-materialize.css">

    <script src="js/materialize.min.js"></script>
    <link rel="stylesheet" href="css/icon.css">
    <link rel="stylesheet" type="text/css" href="css/content.css">
    <script>hljs.initHighlightingOnLoad();</script>
    <link rel="icon" type="image/png" href="icon.png"/>
    <script src="js/script.js"></script>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
</head>

<body>
        <title class="title">
            <%
                String title = request.getParameter("name");
                if(title == null)
                 out.print(" NoteX Home</title>");
                else
                {
                    out.print(title + "- NoteX</title>");
                    out.print(" <div class=\"fixed-action-btn\" style=\"bottom: 20px; right: 44px;\">\n" +
"                    <a class=\"btn-floating btn-large red\" onclick=\"addDocument()\">\n" +
"                    <i class=\"large material-icons\">+</i>\n" +
"                    </a>\n" +
"                    </div>");
                }
            %>

                <ul id="nav-mobile" class="side-nav fixed" style="transform: translateX(0%);">

                    <li class="logo"><a id="logo-container" href="javascript:location.href=location.origin + location.pathname;">
                        <h1>NoteX	</h1>
                        </a></li>
                    <li class="search">
                        <div class="search-wrapper card">
                            <input id="search"><i class="material-icons" onclick="Search()" id="searchBtn">search</i>
                            <div class="search-results"></div>
                        </div>
                    </li>
                    <br>
                
                    <%

                        // printing all collections and ignoring system collections
                        MongoIterable<String> collectionNames = mongoDatabase.listCollectionNames();
                        for(String collection: collectionNames){
                            if(collection.startsWith("system.") == false){

                                out.print("<li class=\"bold\"><a class=\"collapsible-header  waves-effect waves-teal\" href='index.jsp?name="+collection+ "\' id=\'"+
                                                                                collection + "\'>" + collection + "</a> </li>");
                            }
                        }
                        
                    %>

                    </li>
                   
                          <a onclick="addCollection()" class="btn-floating  waves-effect waves-light red"><i class="large material-icons"></i>+</a>
                        </ul>
                      
                    </li>

                </ul>




        <div class="row-offcanvas row-offcanvas-left">
        <div id="sidebar" class="sidebar-offcanvas">
                </div></div></div></div>

                <div class="wrapper">
                <%
			
			String query = request.getParameter("q");
                    String name = request.getParameter("name");
			if( query != null  )
			{
				if( name != "")
				{
				 MongoCollection<Document> collection = mongoDatabase.getCollection(name);
			        collection.createIndex(Indexes.compoundIndex(Indexes.text("problem"),Indexes.text("solution")));
			        Bson textSearch = Filters.text(query, new TextSearchOptions().language("english"));
			        MongoCursor<Document> cursor = collection.find(textSearch).iterator();

			        try {
			            while (cursor.hasNext()) {
		                    Document doc =cursor.next();
		                      out.print("<section ><h4>\n<b>" + doc.get("problem") + "</b></h4><div id=\"" + idNo +
                                    "\"><p>"  +doc.get("solution") + "</p></div><a href =\'" + doc.get("link") +
                                    "\'>"+doc.get("link")+ "</a> <h4 class='right-align'><a style='' class='waves-effect waves-light btn ' " +
                                    "id=\"" + doc.get("_id") + "\" name=\"" + idNo + "\" onClick=clickEvent(this.id,this.name) >      <i class=\"large material-icons\">mode_edit</i>\n" +
                                    "</a>&nbsp;<a class=\"waves-effect waves-light red lighten-1 btn\" onClick=removeDocument(\"" + doc.get("_id") +"\",\""+ name+"\")>-</a></section>");
                                    idNo++;

            }
        } finally {
            cursor.close();
        }

        }
       
        }
			else
			{

                	if(name != "" && name != null)
                	{
                             MongoCollection<Document> collection = mongoDatabase.getCollection(name);
                             MongoCursor<Document> cursor = collection.find().iterator();
                             try {
                                while (cursor.hasNext()) {

                                 Document doc = cursor.next();

                                 out.print("<section id=\"section"+ idNo + "\"><h4>\n<b>" + doc.get("problem") + "</b></h4><div id=\"" + idNo +
                                    "\"><p>"  +doc.get("solution") + "</p></div><a   target=\"_blank\" href =\'" + doc.get("link") +
                                    "\'>"+doc.get("link")+ "</a> <h6 class='right-align'><a style='' class='waves-effect waves-light btn ' " +
                                    "id=\"" + doc.get("_id") + "\" name=\"" + idNo + "\" onClick=clickEvent(this.id,this.name) >      <i class=\"large material-icons\">mode_edit</i>\n\n" +
                                    "</a>&nbsp;<a class=\"waves-effect waves-light red lighten-1 btn\" onClick=removeDocument(\"" +
                                         doc.get("_id") +"\",\""+ name+"\")>-</a></section>");
                                    idNo++;
                                }
                              } finally {
                                cursor.close();
                              }
                          }    
                          }
                %>

                </div>

<footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Tweaks</h5>
                <p class="grey-text text-lighten-4">NoteX have features like store notes from chrome extension, add notes,videos or other media by selecting text or media by right clicking on webpage from chrome browser. You can browse, search and edit notes in your browser.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#!">Take backup</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Restore backup</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            NoteX &#169;  Copyright 2016
            <a class="grey-text text-lighten-4 right" href="#!">Test Links</a>
            </div>
          </div>
        </footer>
</body>
</html>

