<?php
$servername = "localhost";
$username = "shopcart_php";
$password = "Krkovice1";
$dbname = "shopcart_php";
// Create connection
$db = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
?>