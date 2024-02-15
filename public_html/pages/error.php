<?php require_once ('../../private/auth.php'); ?>

<?php
$returnCode = $_GET['returnCode'];
$message = $_GET["error"];

function getHumanReadableErrorCode(int $errorCode): string{
    switch ($errorCode) {
        case 404:
            return "Page non trouvée";
        case 403:
            return "Accès interdit";
        case 400:
            return "Mauvaise requête";
        case 500:
            return "Erreur interne du serveur";
        default:
            return "Une erreur inattendue s'est produite";
    }
}

if (!isset($returnCode)) {
	$errorCode = $_SERVER['REDIRECT_STATUS'] ?? 500;
    $errorMessage = getHumanReadableErrorCode($errorCode);
} else {
    $errorCode = $returnCode;
    if(!isset($message)){
        $errorMessage = getHumanReadableErrorCode($errorCode);
    }else{
        $errorMessage = $message;
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
		<h2>Erreur <?= $errorCode; ?></h2>
		<h4><?= $errorMessage; ?></h4>
		<a href="/index.php" class="btn cancel">Retour à l'accueil</a>
	</main>

<?php include('../pages/footer.php'); ?>

</body>
</html>

