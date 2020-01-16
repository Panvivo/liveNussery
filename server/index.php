<?php
	
	$obj = (array)json_decode(key($_POST));
	session_start();
	echo createRand(rand(40,60));
	print_r($obj['s']);
	
	
	
	function createRand($size=10){
		$supportCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
		$randString = '';
		for($i=0; $i<$size; $i++){
			$randIndex = rand(0, strlen($supportCharacter));
			$randString .= substr($supportCharacter, $randIndex, 1);
		}
		return $randString;
	}
	
	
?>