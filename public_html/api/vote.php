<?php

include_once('../../private/config.php');

header("Content-Type", "application/json");

// ====== Vérification si la requête est une requête POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    // Réponse HTTP 405 Méthode non autorisée
    http_response_code(405);
    echo json_encode(array("error" => "Bad request."));
    exit;
}

// ====== Récupération des données envoyées via la requête AJAX
$data = json_decode(file_get_contents("php://input"));

// ====== Vérification que les données sont présentes et valides
if (!isset($data->choixUtilisateur)) {
    // Réponse HTTP 400 Mauvaise requête
    http_response_code(400);
    echo json_encode(array("error" => "Bad request."));
    exit;
}

// ====== Vérification si l'utilisateur est connecté
include_once('checkSession.php');
$login = $_SESSION['user']['login']; 

// ====== Connexion à la base de données
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué: " . $conn->connect_error);
}

// ======= Vérification si l'utilisateur a déjà voté
$stmt = $conn->prepare("SELECT * FROM EnregistrementVotes WHERE login = ? AND idCampagne = ?");
$stmt->bind_param("si", $login, $IDCAMPAGNE_EN_COURS);
if (!$stmt->execute()) {
	http_response_code(500);
	echo json_encode(array("error" => "Erreur interne du serveur."));
	exit;
}
$stmt->store_result();

if ($stmt->num_rows > 0) {
	// Réponse HTTP 403 Interdit
	http_response_code(403);
	echo json_encode(array("error" => "Vous avez déjà voté."));
	exit;
}

// ======= Vérification si le vote s'effectue entre les dates d'ouverture et de fermeture du vote
$stmt = $conn->prepare("SELECT dateOuvertureVotes, dateFermetureVotes FROM Campagnes WHERE id = ?");
$stmt->bind_param("i", $IDCAMPAGNE_EN_COURS);
if (!$stmt->execute()) {
	http_response_code(500);
	echo json_encode(array("error" => "Erreur interne du serveur."));
	exit;
}
$stmt->store_result();
$stmt->bind_result($dateOuvertureVotes, $dateFermetureVotes);
$stmt->fetch();
$stmt->close();

// Conversion des dates en timestamp
$startDate = strtotime($dateOuvertureVotes);
$endDate = strtotime($dateFermetureVotes);

// Date et heure actuelles
$currentDate = time();

if ($currentDate < $startDate || $currentDate > $endDate) {
	http_response_code(403);
	echo json_encode(array("error" => "Le vote est actuellement fermé."));
	exit;
}

// ======= Préparation de la requête SQL pour insérer l'enregistrement de vote
$conn->begin_transaction();
$stmt = $conn->prepare("INSERT INTO EnregistrementVotes (login, idCampagne) VALUES (?, ?)");
$stmt->bind_param("si", $login, $IDCAMPAGNE_EN_COURS);
if (!$stmt->execute()) {
	http_response_code(500);
	echo json_encode(array("error" => "Erreur interne du serveur."));
	exit;
}
$stmt->close();

// ======= Vérifie que la liste choisie existe sinon la crée
$stmt = $conn->prepare("SELECT * FROM Listes WHERE nom = ?");
$stmt->bind_param("s", $data->choixUtilisateur);
if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(array("error" => "Erreur interne du serveur."));
    exit;
}
$stmt->store_result();

if ($stmt->num_rows == 0) {
    $stmt->close();
    $stmt = $conn->prepare("INSERT INTO Listes (nom, nbVotes, idCampagne) VALUES (?, 0, ?)");
    // Assurez-vous de fournir une valeur pour idCampagne, sinon utilisez NULL ou une valeur par défaut appropriée
    $stmt->bind_param("si", $data->choixUtilisateur, $IDCAMPAGNE_EN_COURS);
    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode(array("error" => "Erreur interne du serveur."));
        exit;
    }
    $stmt->close();
}

// ======= Ajout d'un vote à la liste choisie
$stmt = $conn->prepare("UPDATE Listes SET nbVotes = nbVotes + 1 WHERE nom = ?");
$stmt->bind_param("s", $data->choixUtilisateur);
if (!$stmt->execute()) {
	http_response_code(500);
	echo json_encode(array("error" => "Erreur interne du serveur."));
	exit;
}
$stmt->close();

$conn->commit();

// ====== Réponse HTTP 200 OK
http_response_code(200);
echo json_encode(array("message" => "Votre vote a été enregistré."));
exit;

?>
