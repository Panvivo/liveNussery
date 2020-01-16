<?php	
include "tools/functions.php";	
$sessionID = startSession('');
$mysqli = createConnection();



	
	
if ($result = $mysqli -> query("SELECT * FROM user WHERE userName='".$obj['userName']."' and password='".$obj['password']."'")) {
	if(mysqli_num_rows($result)){
		$row = $result -> fetch_object();	
		$mysqli -> query("UPDATE user SET accessToken='".$sessionID."' WHERE userID='".$row->userID."'");
		$return['accessToken'] = $sessionID;
		$return['firstName'] = $row->firstName;
		$return['lastName'] = $row->lastName;
		$return['userID'] = md5($row->userID);
		$_SESSION['userID'] = $row->userID;
		$_SESSION['userType'] = $row->userType;
		if($_SESSION['userType']=="V"){
			$_SESSION['vendorID'] = $row->vendorID;
			$result = $mysqli -> query("SELECT * FROM vendor WHERE vendorID='".$row->vendorID."'");
			if(mysqli_num_rows($result)){
				$row = $result -> fetch_object();
				$_SESSION['vendorName'] = $row->vendorName;
			}
		}
	} else {
		$return['error'] = 'Invalid user name and password';
	}
} else {
	echo $mysqli->error;			
}	

	


$myJSON = json_encode($return);

echo $myJSON;
?>