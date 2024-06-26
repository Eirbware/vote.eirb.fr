<?php require_once ('../../private/auth.php'); ?>

<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Vote en ligne</title>
	<link rel="stylesheet" href="/assets/css/style.css">
	<link rel="stylesheet" href="/assets/css/header.css">
	<link rel="stylesheet" href="/assets/css/footer.css">
	<style>
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
<?php include('../pages/header.php'); ?>

<main>
	<h2>Élection du Bureau Des Sports 2024</h2>
	<section class="campagnes">
		<div class="progress-container">
			<ul class="progress-steps">
				<li class="active">Choix de la liste</li>
				<li class="active">Confirmation</li>
				<li class="active">Récépissé de vote</li>
			</ul>
		</div>
		<h3>Votre vote a bien été pris en compte</h3>
		<div class="confirmation">
			<a href="/index.php" class="btn cancel">Retour à l'accueil</a>
		</div>
	</section>
</main>

<?php include('../pages/footer.php'); ?>
</body>
</html>
