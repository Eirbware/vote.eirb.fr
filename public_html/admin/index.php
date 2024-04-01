<?php
require_once('../../private/config.php');

require_once('../../private/auth.php');

// define $_admins in private/config.php

if (!in_array($_SESSION['user']['login'], $_admins)) {
	redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
}

// ====== Connexion à la base de données
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué: " . $conn->connect_error);
}

$sql = "SELECT * FROM Campagnes WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $IDCAMPAGNE_EN_COURS);
$stmt->execute();
$result = $stmt->get_result();

function get_number_of_voting_users_for_campagne(int $id, mysqli $conn): int{
    $sql = "SELECT COUNT(*) AS 'nbVoting' FROM EnregistrementVotes WHERE idCampagne = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    if(!$stmt->execute()){
        http_response_code(500);
        exit;
    }

    $res = $stmt->get_result();
    $ret = $res->fetch_assoc()["nbVoting"];
    $stmt->close();

    return $ret;
}

function print_votes_for_campagne_and_get_sum(int $id, mysqli $conn): int{
    $sql = "SELECT * FROM Listes WHERE idCampagne = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    if(!$stmt->execute()){
        http_response_code(500);
        exit;
    }
    $res = $stmt->get_result();
    $sumVotes = 0;
    while($row = $res->fetch_assoc()){
        echo "<li>Liste '" . $row["nom"] . "':</li>";
        echo "<ul>";
        echo "<li>nbVotes: " . $row["nbVotes"] . "</li>";
        echo "</ul>";
        $sumVotes += $row["nbVotes"];
    }
    $stmt->close();
    return $sumVotes;
}

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "Campagne " . $row["id"] . ":";
        echo "<ul>";
        $sumVotes = print_votes_for_campagne_and_get_sum($row["id"], $conn);
        echo "<li>Nombre de votes : " . $sumVotes . "</li>";
        if($sumVotes !== get_number_of_voting_users_for_campagne($row["id"], $conn)){
            echo "<li><b>Votes incohérents!!!</b>";
        }
        echo "</ul>";
    }
} else {
    echo "0 results";
}
$result->close();


?>


