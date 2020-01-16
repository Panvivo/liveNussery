<?php	
include "../tools/functions.php";	
$sessionID = startSession($obj);
$mysqli = createConnection();
verifyUser($obj, $return);

	
	
if ($result = $mysqli -> query("UPDATE category SET active='".$obj['active']."' WHERE categoryID='".$obj['categoryID']."'")) {
	$return['success'] = 'Category successfully '.($obj['active']=='1'?"Activated":"In-activated");
} else {
	echo $mysqli->error;			
}	




$myJSON = json_encode($return);

echo $myJSON;
?>