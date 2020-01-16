<?php	
include "../tools/functions.php";	
$sessionID = startSession($obj);
$mysqli = createConnection();
verifyUser($obj, $return);	


//print_r($obj);

$sql = "INSERT into product SET ";
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
	
if ($result = $mysqli -> query($sql)) {
	$return['success'] = 'Product Inserted sucessfully.';
} else {
	echo $mysqli->error;			
}	

$myJSON = json_encode($return);

echo $myJSON;

?>