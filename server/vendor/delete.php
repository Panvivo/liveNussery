<?php	
include "../tools/functions.php";	
$sessionID = startSession($obj);
$mysqli = createConnection();
verifyUser($obj, $return);

	
if($result = $mysqli -> query("SELECT count(*) AS total FROM `category` WHERE parentCategoryID = '".$obj['categoryID']."'")){	
	if(mysqli_num_rows($result)){
		$row = $result -> fetch_object();	
		if($row->total==0){
			if ($result = $mysqli -> query("DELETE FROM category WHERE categoryID='".$obj['categoryID']."'")) {
				$return['success'] = 'Category deleted successfully.';
			} else {
				echo $mysqli->error;			
			}	
		} else {
			$return['systemError'] = 'Cannot deleted as it is linked to another.';
		}
	}
}

$myJSON = json_encode($return);

echo $myJSON;
?>