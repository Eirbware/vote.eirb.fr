<?php include('../includes/header.php'); ?>

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
			text-decoration: none; /* Supprimer le soulignement */
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
            <a href="https://mafi.eirb.fr/" rel="nofollow">
                <img src="/assets/images/mafieirb.png" class="card-logo">
                <div class="card-text-box">
                    <h4>Mafi'eirb</h4>
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
