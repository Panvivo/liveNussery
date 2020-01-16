<?php	
include "../tools/functions.php";	
$sessionID = startSession($obj);
$mysqli = createConnection();
verifyUser($obj, $return);


	
	
if ($result = $mysqli -> query("SELECT * FROM category")) {
	if(mysqli_num_rows($result)){
		$return['item'] = [];
		while($row = $result -> fetch_object()){	
			$eachRec = [];
			$eachRec['categoryID'] = $row->categoryID;
			$eachRec['categoryName'] = $row->categoryName;
			$eachRec['parentCategoryID'] = $row->parentCategoryID;
			$eachRec['active'] = $row->active;
			$eachRec['URL'] = $row->URL;
			array_push($return['item'],$eachRec);
		}
	} 
} else {
	echo $mysqli->error;			
}	




$myJSON = json_encode($return);

echo $myJSON;
?>