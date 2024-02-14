<?php
// ===== Vérifie si l'utilisateur est connecté

// Démarrage de la session
session_start();

// Récupération du login de l'utilisateur à partir de la session
if (!isset($_SESSION['user']['login'])) {
    // Réponse HTTP 401 Non autorisé
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized"));
    exit;
}
?>