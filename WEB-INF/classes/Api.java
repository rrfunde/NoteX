import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCursor;
import org.bson.Document;
import com.mongodb.client.FindIterable;
import com.mongodb.DB;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.set;
import org.bson.types.ObjectId;
import com.mongodb.BasicDBObject;

public class Api extends HttpServlet{
    public void doPost(HttpServletRequest req,HttpServletResponse res)   throws ServletException,IOException
    {

        res.setContentType("text/html");
        PrintWriter pw=res.getWriter();

        MongoClient mongoClient = new MongoClient();
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
        pw.close();

    }

}
