<?php include('includes/header.php'); ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vote en ligne</title>
    <link rel="stylesheet" href="/assets/css/style.css">
    <style>
        main {
            padding: 1em;
        }

        main h2 {
            font-weight: 500;
        }

		.btn {
			margin-top: 4em;
			margin-bottom: 2em;
			padding: 10px;
			font-size: 20px;
			font-weight: 600;
			background-color: var(--accent); 
			border: 2px solid var(--accent); 
			color: #fff;
		}

    </style>
</head>
<body>
<main>

    <h2>Election du Bureau Des Élèves 2024</h2>
    <section class="campagnes">
		<div class="alert" role="alert">
			<div class="alert-icon">
				<img src="assets/images/alert.svg" alt="Icône d'alerte">
			</div>
			<div class="alert-text">
				<p style="margin: 0;">Le vote des campagnes se termine dans 8h 32min et 46s</p>
			</div>
		</div>
        <h3>Listes candidates</h3>
        <div class="cards">
            <a href="https://mafi.eirb.fr/" rel="nofollow">
                <img src="assets/images/mafieirb.png" class="card-logo">
                <div class="card-text-box">
                    <h4>Mafi'eirb</h4>
                    <p>Votez pour votre liste préférée</p>
                    <img src="assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
                </div>
            </a>
			<a href="https://dionys.eirb.fr/" rel="nofollow">
                <img src="assets/images/dionyseirb.png" class="card-logo">
                <div class="card-text-box">
                    <h4>Dionys'eirb</h4>
                    <p>Votez pour votre liste préférée</p>
                    <img src="assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
                </div>
            </a>
		</div>
        <a href="/pages/choice.php" class="btn">Passer au vote</a>
    </section>
</main>
</body>
</html>

<?php include('includes/footer.php'); ?>
