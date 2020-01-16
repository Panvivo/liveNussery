<?php	
include "../tools/functions.php";	
$sessionID = startSession($obj);
$mysqli = createConnection();



verifyUser($obj, $return);



$update = true;
$i=20;
$search = $obj['parentCategoryID'];
do {
	$i--;
	$result = $mysqli -> query("SELECT * FROM category WHERE categoryID='".$search."'");
	if(mysqli_num_rows($result)){
		while($row = $result -> fetch_object()){
			$search = $row->parentCategoryID;
			
			if($row->parentCategoryID == $obj['categoryID']){
				//echo $row->parentCategoryID ."==". $obj['categoryID']. "----------";
				$update = false;
				break;
			}
		}
	}	
} while(mysqli_num_rows($result) && $i);

if($update && $obj['parentCategoryID']!=$obj['categoryID']){
	if ($result = $mysqli -> query("UPDATE category SET parentCategoryID='".$obj['parentCategoryID']."', categoryName='".$obj['categoryName']."' WHERE categoryID='".$obj['categoryID']."'")) {
		$return['success'] = 'Category successfully updated.';
	} else {
		echo $mysqli->error;			
	}
} else {
	$return['error'] = 'Category cannot be inside its category.';
}




$myJSON = json_encode($return);

echo $myJSON;
//{"auth":{"accessToken":"dSJYJQKePJS1cPN5xQEY6RvtoyXCrqiVtrIcPh5e","userID":"c4ca4238a0b923820dcc509a6f75849b"}}


?>