<?php require_once ('../../private/auth.php'); ?>

<?php
$returnCode = $_GET['returnCode'];

if (!isset($returnCode)) {
	$errorCode = isset($_SERVER['REDIRECT_STATUS']) ? $_SERVER['REDIRECT_STATUS'] : 500;
	switch ($errorCode) {
		case 404:
			$errorMessage = "Page non trouvée";
			break;
		case 403:
			$errorMessage = "Accès interdit";
			break;
		case 500:
			$errorMessage = "Erreur interne du serveur";
			break;
		default:
			$errorMessage = "Une erreur inattendue s'est produite";
			break;
	}
} else {
	switch ($returnCode) {
		case "NO_VOTE":
			$errorCode = "";
			$errorMessage = "Pas de vote en cours";
			break;
		default:
			$errorCode = 500;
			$errorMessage = "Une erreur inattendue s'est produite";
			break;
	}
	
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Erreur <?php echo $errorCode; ?></title>
	<link rel="stylesheet" href="/assets/css/style.css">
	<link rel="stylesheet" href="/assets/css/header.css">
	<link rel="stylesheet" href="/assets/css/footer.css">
	<style>
		main {
			padding: 2em;
			display: flex;
			flex-direction: column;
		}

		main h2 {
			font-weight: 500;
			margin-bottom: 0;
		}

		.btn {
			padding: 10px;
			font-size: 16px;
			background-color: var(--accent); 
			border: 2px solid var(--accent); 
			color: black;
			text-decoration: none; 
			margin-top: 2em;
		}

		.btn.cancel {
			background-color: white;
			border-color: var(--secondary);
			color: var(--secondary);
		}

	</style>
</head>
<body>
<?php include('../pages/header.php'); ?>

	<main>
		<h2>Erreur <?php echo $errorCode; ?></h2>
		<h4><?php echo $errorMessage; ?></h4>
		<a href="/index.php" class="btn cancel">Retour à l'accueil</a>
	</main>

<?php include('../pages/footer.php'); ?>

</body>
</html>

