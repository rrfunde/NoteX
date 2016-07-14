<%@page import="com.mongodb.DBCollection"
        import="com.mongodb.MongoClient"
        import="com.mongodb.client.MongoCursor"
        import="org.bson.Document"
        import="com.mongodb.client.FindIterable"
        import="com.mongodb.DB"
        import="com.mongodb.client.*"
        import="com.mongodb.client.MongoDatabase"
	import="com.mongodb.BasicDBObject"
	import="com.mongodb.DBObject"
	import="org.bson.conversions.Bson"
	import="com.mongodb.client.model.*"
%>
<%!


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
   <link rel="stylesheet" href="css/bootstrap.min.css">
    <script src="js/bootstrap.min.js"></script>
    <script src="js/materialize.min.js"></script>
    <link rel="stylesheet" href="css/icon.css">
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
                    <a onclick="addCollection()" class="btn-floating  waves-effect waves-light red"><i class="large material-icons"></i></a>
                    <%
                        MongoIterable<String> collectionNames = mongoDatabase.listCollectionNames();
                        for(String collection: collectionNames){
                            if(collection.startsWith("system.") == false){

                                out.print("<li class=\"bold\"><a class=\"collapsible-header  waves-effect waves-teal\" href='index.jsp?name="+collection+ "\' id=\'"+
                                                                                collection + "\'>" + collection + "</a> </li>");
                            }
                        }
                    %>


                    </li>
                        </ul>
                    </li>

                </ul>




        <div class="row-offcanvas row-offcanvas-left">
        <div id="sidebar" class="sidebar-offcanvas">

                <h3>&nbsp;&nbsp;Subject&nbsp;&nbsp;&nbsp;
                </h3>
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
			        collection.createIndex(Indexes.text("problem"));
			        Bson textSearch = Filters.text(query, new TextSearchOptions().language("english"));
			        MongoCursor<Document> cursor = collection.find(textSearch).iterator();

			        try {
			            while (cursor.hasNext()) {
		                    Document doc =cursor.next();
		                      out.print("<section ><h4>\n<b>" + doc.get("problem") + "</b></h4><div id=\"" + idNo +
                                    "\"><p>"  +doc.get("solution") + "</p></div><a href =\'" + doc.get("link") +
                                    "\'>"+doc.get("link")+ "</a> <h4 class='right-align'><a style='' class='waves-effect waves-light btn ' " +
                                    "id=\"" + doc.get("_id") + "\" name=\"" + idNo + "\" onClick=clickEvent(this.id,this.name) >Edit\n" +
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

                	if(name != null)
                	{
                             MongoCollection<Document> collection = mongoDatabase.getCollection(name);
                             MongoCursor<Document> cursor = collection.find().iterator();
                             try {
                                while (cursor.hasNext()) {

                                 Document doc = cursor.next();

                                 out.print("<section ><h4>\n<b>" + doc.get("problem") + "</b></h4><div id=\"" + idNo +
                                    "\"><p>"  +doc.get("solution") + "</p></div><a href =\'" + doc.get("link") +
                                    "\'>"+doc.get("link")+ "</a> <h4 class='right-align'><a style='' class='waves-effect waves-light btn ' " +
                                    "id=\"" + doc.get("_id") + "\" name=\"" + idNo + "\" onClick=clickEvent(this.id,this.name) >Edit\n" +
                                    "</a>&nbsp;<a class=\"waves-effect waves-light red lighten-1 btn\" onClick=removeDocument(\"" + doc.get("_id") +"\",\""+ name+"\")>-</a></section>");
                                    idNo++;
                                }
                              } finally {
                                cursor.close();
                              }
                          }    
                          }
                %>

                </div>

</body>
</html>
