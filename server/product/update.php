<?php	
include "../tools/functions.php";	
$sessionID = startSession($obj);
$mysqli = createConnection();



verifyUser($obj, $return);

$sql = "UPDATE product SET ";
$sql .= "categoryID='".$obj['categoryID']."' ";
$sql .= ", productName='".$obj['productName']."'";
$sql .= ", active='0'";
if(isset($obj['price'])){
	$sql .= ", price='".$obj['price']."'";
}	
if(isset($obj['metaTag'])){
	$sql .= ", metaTag='".$obj['metaTag']."'";
}
if(isset($obj['metaDescription'])){
	$sql .= ", metaDescription='".$obj['metaDescription']."'";
}
if(isset($obj['URL'])){
	$sql .= ", URL='".$obj['URL']."'";
}
if(isset($obj['onSale'])){	
	$sql .= ", onSale='".$obj['onSale']."'";
	$sql .= ", salePrice='".$obj['salePrice']."'";
}
if(isset($obj['isFeatured'])){	
	$sql .= ", isFeatured='".$obj['isFeatured']."'";
}
$sql .= " WHERE productID='".$obj['productID']."'";
//echo $sql;
if ($result = $mysqli -> query($sql)) {
	$return['success'] = 'Product successfully updated.';
} else {
	echo $mysqli->error;			
}




$myJSON = json_encode($return);

echo $myJSON;
//{"auth":{"accessToken":"dSJYJQKePJS1cPN5xQEY6RvtoyXCrqiVtrIcPh5e","userID":"c4ca4238a0b923820dcc509a6f75849b"}}


?>