import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCursor;
import org.bson.Document;
import com.mongodb.DB;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.set;
import org.bson.types.ObjectId;
import com.mongodb.BasicDBObject;
import com.mongodb.client.*;
public class Api extends HttpServlet{
  MongoClient mongoClient = new MongoClient();

    public void doPost(HttpServletRequest req,HttpServletResponse res)   throws ServletException,IOException
    {

        res.setContentType("text/html");
        PrintWriter pw=res.getWriter();

        MongoDatabase mongoDatabase = mongoClient.getDatabase("NoteX");

        String request = req.getParameter("req");

        if(request.equals("newCollection"))
        {
            mongoDatabase.createCollection(req.getParameter("Collection"));
        }

        else if(request.equals("EditServe"))
        {
            MongoCollection<Document> collection = mongoDatabase.getCollection(req.getParameter("Collection"));

            collection.updateOne( new BasicDBObject("_id", new ObjectId(req.getParameter("id"))),
                    new BasicDBObject("$set", new BasicDBObject("solution", req.getParameter("solution"))));
            pw.print("updated");

        }


	else if(request.equals("addDocument"))
	{

	MongoCollection<Document> collection = mongoDatabase.getCollection(req.getParameter("title").toLowerCase());

        String problem = req.getParameter("topic");
        String solution = req.getParameter("text");
        String link = req.getParameter("linkText");


        Document myDoc = collection.find(eq("problem", problem)).first();

        try {
            int a = req.getParameterValues("code").length;
            solution = "<pre><code>" + solution + "</pre></code>";
        } catch (Exception e) {
        }

        try {
            myDoc.toJson();
            collection.updateOne(eq("problem", problem), set("solution", myDoc.get("solution") + "<br /> " + solution));

            pw.print("updated");

        } catch (Exception e) {
            Document doc = new Document("problem", problem).append("solution", solution).append("link", link);
            collection.insertOne(doc);

            pw.print("saved");
        }

	}
        else if(request.equals("removeDocument"))
        {
            String name = req.getParameter("name");
            String id = req.getParameter("id");
            MongoCollection<Document> collection = mongoDatabase.getCollection(name);

            BasicDBObject query = new BasicDBObject();
            query.put("_id", new ObjectId(id));

            collection.deleteOne(query);
            pw.print("deleted");

        }

         else if(request.equals("getCollections"))
        {
  		      MongoIterable<String> collectionNames = mongoDatabase.listCollectionNames();
                       for(String collection: collectionNames){
                            if(collection.startsWith("system.") == false){

                                pw.print(collection +",");
                            }
                        }
        }
        pw.close();

    }

}
