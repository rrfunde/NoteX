<?php
$title=$_POST['title'];
$i=0;
$titleList=explode(" ",$title);
foreach($titleList as $t)
{
    if(strlen($t)<3)
    {
       unset($titleList[$i]);

    }
    $i++;
}
foreach($titleList as $t)
{
  //  echo $t."\n";
}

//$m = new MongoClient("mongodb://rrfunde:Jhearts128@ds063870.mongolab.com:63870/notex_mini");
$m=new MongoClient("localhost");

// $db = $m->notex_mini; // select a database

$db=$m->selectDB("NoteX_mini");
$list=$db->listCollections();
$i=0;
foreach ($list as $s1) {
   $c=strrpos($s1,'.')+1;
   $list[$i++]=substr($s1,$c,strlen($s1));

}
$result=array_intersect($titleList,$list);
echo $result;

?>