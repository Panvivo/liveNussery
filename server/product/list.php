<?php	
include "../tools/functions.php";	
$sessionID = startSession($obj);
$mysqli = createConnection();
verifyUser($obj, $return);

if ($result = $mysqli -> query("SELECT * FROM product")) {
	if(mysqli_num_rows($result)){
		$return['item'] = [];
		while($row = $result -> fetch_object()){	
			$eachRec = [];
			$eachRec['productID'] = $row->productID;
			$eachRec['categoryID'] = $row->categoryID;
			$eachRec['productName'] = $row->productName;
			$eachRec['active'] = $row->active;
			$eachRec['price'] = $row->price;
			$eachRec['metaTag'] = $row->metaTag;
			$eachRec['metaDescription'] = $row->metaDescription;
			$eachRec['onSale'] = $row->onSale;
			$eachRec['salePrice'] = $row->salePrice;
			$eachRec['isFeatured'] = $row->isFeatured;
			array_push($return['item'],$eachRec);
		}
	} 
} else {
	echo $mysqli->error;			
}	




$myJSON = json_encode($return);

echo $myJSON;
?>