
<?php

//$m = new MongoClient("mongodb://rrfunde:Jhearts128@ds063870.mongolab.com:63870/notex_mini");
$m=new MongoClient("127.0.0.1");
// $db = $m->notex_mini; // select a database

$db=$m->selectDB("NoteX_mini");

$subject=$_POST['title'];
$problem=$_POST['topic'];
$solution=$_POST['text'];
$link1=$_POST['linkText'];					// select a collection

$db->createCollection($subject);


$solution="&nbsp;&nbsp;&nbsp;&nbsp;".str_replace("\\\"","\"",$solution);
//$solution=str_replace("-",":",$solution);
if(isset($_POST['code']))
{
    $solution="<pre><code>".$solution."</code></pre>";
}
$subject=strtolower($subject);
$collection = $db->$subject;


$document = array( "problem" => $problem, "solution" => $solution,"link"=>$link1 );

// add a record
//echo $document;

$find1=array("problem"=> $problem);
$cursor=$collection->find($find1);
$cnt=$cursor->count();
if($cnt!=0)
{
  foreach($cursor as $document)
         {
       //  if (isset($document["solution"])) 
         //{
   
          $d=$document["solution"];
/*        }
       else
       {
       $d="";
       }
*/        
	$text=$d."\n"."<hr width='100%'>".$solution;
	}
	$u=array('$set'=>array("solution"=>$text));
	
	$collection->update(array("problem"=>$problem),$u);
}
else
{
$collection->insert($document);
}

echo "saved";
