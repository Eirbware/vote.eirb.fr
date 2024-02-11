<?php include('../includes/header.php'); ?>

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
    </style>
</head>
<body>
<main>
    <h2>Election du Bureau Des Élèves 2024</h2>
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
            <a href="/pages/confirmation.php" rel="nofollow">
                <img src="/assets/images/mafieirb.png" class="card-logo">
                <div class="card-text-box">
                    <h4>Mafi'eirb</h4>
                    <p>Votez pour votre liste préférée</p>
                    <img src="/assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
                </div>
            </a>
			<a href="/pages/confirmation.php" rel="nofollow">
                <img src="/assets/images/dionyseirb.png" class="card-logo">
                <div class="card-text-box">
                    <h4>Dionys'eirb</h4>
                    <p>Votez pour votre liste préférée</p>
                    <img src="/assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
                </div>
            </a>
            <a href="/pages/confirmation.php" rel="nofollow">
                <img src="/assets/images/other-vote.svg" class="card-logo">
                <div class="card-text-box">
                    <h4>Blanc</h4>
                    <p>Votez pour votre liste préférée</p>
                    <img src="/assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
                </div>
            </a>
            <a href="/pages/other.php" rel="nofollow">
                <img src="/assets/images/help.svg" class="card-logo">
                <div class="card-text-box">
                    <h4>Autre</h4>
                    <p>Votez pour votre liste préférée</p>
                    <img src="/assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
                </div>
            </a>
		</div>
    </section>
</main>
</body>
</html>

<?php include('../includes/footer.php'); ?>
