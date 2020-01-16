<?php	
include "../tools/functions.php";	
$sessionID = startSession($obj);
$mysqli = createConnection();
verifyUser($obj, $return);	
	
if ($result = $mysqli -> query("INSERT into category SET parentCategoryID='".$obj['parentCategoryID']."', categoryName='".$obj['categoryName']."', active='0'")) {
	$return['success'] = 'Category Inserted sucessfully.';
} else {
	echo $mysqli->error;			
}	

$myJSON = json_encode($return);

echo $myJSON;
?>