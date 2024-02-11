<?php require_once ('../private/auth.php'); ?>

<?php include('../includes/header.php'); ?>

<?php
if (!isset($_GET['choix'])) {
	header('Location: /pages/choice.php');
	exit;
} 
// Récupère le choix de l'utilisateur depuis l'URL
$choixUtilisateur = $_GET['choix'];

// Utilise le choix de l'utilisateur pour afficher la carte correspondante
switch($choixUtilisateur) {
	case "mafieirb":
		$logo = "/assets/images/mafieirb.png";
		$nom = "Mafi'eirb";
		break;
	case "dionyseirb":
		$logo = "/assets/images/dionyseirb.png";
		$nom = "Dionys'eirb";
		break;
	case "kalashcrimineirb":
		$logo = "/assets/images/kalashcrimineirb.png";
		$nom = "Kalashcri</br>min'eirb";
		break;
	case "blanc":
		$logo = "/assets/images/other-vote.svg";
		$nom = "Blanc";
		break;
	default:
		$logo = "/assets/images/help.svg";
		$nom = "$choixUtilisateur";
}

// Ouverture de la connexion à la base de données mysql
$conn = new mysqli($host, $username, $password, $database);

// Vérifie si la connexion a échoué
if ($conn->connect_error) {
	die("La connexion à la base de données a échoué: " . $conn->connect_error);
}


?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vote en ligne</title>
    <link rel="stylesheet" href="/assets/css/style.css">
    <style>
        .cards a h4 {
            margin-bottom: 0 !important; 
        }
		.cards a {
			box-shadow: 0px 3px var(--default-gray) !important;
		}

		.cards a:hover {
    		transform: none !important;
		}

		.confirmation {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			padding-top: 3em;
			margin-left: 0.5em;
			margin-top: auto; 
		}

		.btn {
			margin-right: 2em;
			padding: 10px;
			font-size: 16px;
			background-color: var(--accent); 
			border: 2px solid var(--accent); 
			color: black;
			text-decoration: none; 
		}

		.btn.cancel {
			background-color: white;
			border-color: var(--secondary);
			color: var(--secondary);
		}
    </style>
</head>
<body>
<main>
    <h2>Election du Bureau Des Élèves 2024</h2>
    <section class="campagnes">
		<div class="progress-container">
			<ul class="progress-steps">
				<li class="active">Choix de la liste</li>
				<li class="active">Confirmation</li>
				<li>Récépissé de vote</li>
			</ul>
		</div>
        <h3>Confirmez votre choix</h3>
        <div class="cards">
            <a rel="nofollow">
                <img src="<?= $logo ?>" class="card-logo">
                <div class="card-text-box">
                    <h4><?= $nom ?></h4>
                </div>
            </a>
		</div>
		<div class="confirmation">
			<a href="/pages/receipt.php" class="btn">Confirmer</a>
			<a href="/pages/choice.php" class="btn cancel">Annuler</a>
		</div>
    </section>
</main>
</body>
</html>

<?php include('../includes/footer.php'); ?>
