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
		main {
			padding: 1em;
		}

		main h2 {
			font-weight: 500;
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
				<li>Confirmation</li>
				<li>Récépissé de vote</li>
			</ul>
		</div>
		<h3>Choix pour l'élection</h3>
		<div class="cards">
			<a href="/pages/confirmation.php?choix=atlanteirb" rel="nofollow">
				<img src="/assets/images/atlanteirb.png" class="card-logo">
				<div class="card-text-box">
					<h4>Atlant'eirb</h4>
					<p>Votez pour votre liste préférée</p>
					<img src="/assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
				</div>
			</a>
			<a href="/pages/confirmation.php?choix=olympeirb" rel="nofollow">
				<img src="/assets/images/olympeirb.png" class="card-logo">
				<div class="card-text-box">
					<h4>Olymp'eirb</h4>
					<p>Votez pour votre liste préférée</p>
					<img src="/assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
				</div>
			</a>
			<a href="/pages/confirmation.php?choix=lospollosheirbmanos" rel="nofollow">
				<img src="/assets/images/lospollosheirbmanos.png" class="card-logo">
				<div class="card-text-box">
					<h4>Los Pollos Heirbmanos</h4>
					<p>Votez pour votre liste préférée</p>
					<img src="/assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
				</div>
			</a>
			<a href="/pages/confirmation.php?choix=blanc" rel="nofollow">
				<img src="/assets/images/other-vote.svg" class="card-logo">
				<div class="card-text-box">
					<h4>Blanc</h4>
					<img src="/assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
				</div>
			</a>
		</div>
	</section>
</main>
<?php include('../pages/footer.php'); ?>
</body>
</html>

