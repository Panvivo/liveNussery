<?php	
include "../tools/functions.php";	
$sessionID = startSession($obj);
$mysqli = createConnection();
verifyUser($obj, $return);


	
	
if ($result = $mysqli -> query("SELECT * FROM vendor")) {
	if(mysqli_num_rows($result)){
		$return['item'] = [];
		while($row = $result -> fetch_object()){	
			$eachRec = [];
			$eachRec['vendorID'] = $row->vendorID;
			$eachRec['vendorName'] = $row->vendorName;
			$eachRec['vendorType'] = $row->vendorType;
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