<?php	
include "../tools/functions.php";	
$sessionID = startSession($obj);
$mysqli = createConnection();
verifyUser($obj, $return);


	
	
if ($result = $mysqli -> query("SELECT * FROM variation")) {
	if(mysqli_num_rows($result)){
		$return['item'] = [];
		while($row = $result -> fetch_object()){	
			$eachRec = [];
			$eachRec['variationID'] = $row->variationID;
			$eachRec['variationText'] = $row->variationText;
			
			$eachRec['active'] = $row->active;
			
			array_push($return['item'],$eachRec);
		}
	} 
} else {
	echo $mysqli->error;			
}	




$myJSON = json_encode($return);

echo $myJSON;
?>