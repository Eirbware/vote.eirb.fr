<?php
require_once('../../private/config.php');

require_once('../../private/auth.php');

// define $_admins in private/config.php

if (!in_array($_SESSION['user']['login'], $_admins)) {
	die_with_http_code(403);
}

// ====== Connexion à la base de données
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué: " . $conn->connect_error);
}

$sql = "SELECT * FROM Listes";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "Listes:<br>";
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - idCampagne: " . $row["idCampagne"]. " - nom: " . $row["nom"]. " - nbVotes: " . $row["nbVotes"]. "<br>";
    }
} else {
    echo "0 results";
}


?>


