<?php
	$API_ID = "36d135eff2e4955bd0bdf0b39033cd72";
	$url = "http://api.openweathermap.org/data/2.5/weather?q=";
	$city = "Delhi";
	$url = $url.$city.'&APPID='.$API_ID.'&units=metric';
	$response = file_get_contents($url);
	header('Content-Type: application/json');
	echo $response;
?>