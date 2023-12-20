<?php
$servername = "localhost";
$username = "shopcart_php";
$password = "Krkovice1";
$dbname = "login";

$db = mysqli_connect($servername, $username, $password, $dbname);


if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
  }


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $kresni = $_POST["kresni"];
    $prijmeni = $_POST["prijmeni"];
    $email = $_POST["email"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    // data se vloží do databáze
    $sql = "INSERT INTO login (kresni, prijmeni, email, password) VALUES ('$kresni', '$prijmeni', '$email', '$password')";

    if ($db->query($sql) === TRUE) {
        echo "Registrace proběhla úspěšně.";
    } else {
        echo "Error: " . $sql . "<br>" . $db->error;
    }
}

// zavřít spojení
$db->close();
?>