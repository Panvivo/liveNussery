<?php
$obj = (array)json_decode(file_get_contents("php://input"));
header("Access-Control-Allow-Origin: *");
$return = [];

function createRand($size=10){
	$supportCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
	$randString = '';
	for($i=0; $i<$size; $i++){
		$randIndex = rand(0, strlen($supportCharacter));
		$randString .= substr($supportCharacter, $randIndex, 1);
	}
	return $randString;
}


function verifyUser($obj, $return){
	
	
	if(isset($_SESSION['userID']) && $obj['auth']->userID == md5($_SESSION['userID'])){
		return true;
	} else {		
		$return['error'] = 'Session Logout';
		$myJSON = json_encode($return);
		echo $myJSON;
		exit();
		return false;
	}
}

function startSession($obj){
	if(!isset($obj['auth']->accessToken)){
		$sessionID = createRand(rand(40,60));
		session_id($sessionID);
		session_start();
		return $sessionID;		
	} else {
		session_id($obj['auth']->accessToken);
		session_start();
		return $obj['auth']->accessToken;
	}
}

function createConnection(){
	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "nussery";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $database);

	// Check connection
	if ($conn->connect_error) {
		die("Failed to connect to MySQL: " . $conn -> connect_error);
	} 
	return $conn;
}
?>