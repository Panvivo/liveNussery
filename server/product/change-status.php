<?php	
include "../tools/functions.php";	
$sessionID = startSession($obj);
$mysqli = createConnection();
verifyUser($obj, $return);

	
	
if ($result = $mysqli -> query("UPDATE product SET active='".$obj['active']."' WHERE productID='".$obj['productID']."'")) {
	$return['success'] = 'Product successfully '.($obj['active']=='1'?"Activated":"In-activated");
} else {
	echo $mysqli->error;			
}	




$myJSON = json_encode($return);

echo $myJSON;
?>