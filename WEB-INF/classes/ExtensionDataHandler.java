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


public class ExtensionDataHandler extends HttpServlet{  
public void doPost(HttpServletRequest req,HttpServletResponse res)   throws ServletException,IOException  
{  
	

        MongoClient mongoClient = new MongoClient();
        MongoDatabase mongoDatabase = mongoClient.getDatabase("NoteX");
       MongoCollection<Document> collection = mongoDatabase.getCollection(req.getParameter("title").toLowerCase());

	String problem = req.getParameter("topic");
	String solution = req.getParameter("text");
	String link = req.getParameter("linkText");
        
       
     
          Document myDoc = collection.find(eq("problem", problem)).first();
       
            try{
             int a = req.getParameterValues("code").length;
        solution =  "<pre><code>" + solution + "</pre></code>";
        }
        catch(Exception e)
        {
        }
         
        try {
            myDoc.toJson();
            collection.updateOne(eq("problem", req.getParameter("topic")), set("solution", myDoc.get("solution") +"<br /> " +  solution));
             res.setContentType("text/html");  
           PrintWriter pw=res.getWriter();  
           pw.print("updated");
           pw.close();
        }
        catch (Exception e){
             Document doc = new Document("problem",problem).append("solution",solution).append("link",link);
            collection.insertOne(doc);
            res.setContentType("text/html");  
           PrintWriter pw=res.getWriter();  
           pw.print("saved");
           pw.close();
        }

}

}  
