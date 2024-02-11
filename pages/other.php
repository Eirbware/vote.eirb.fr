<?php require_once ('../private/auth.php'); ?>

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

		.input-text {
			background-color: #eeeeee;
			border-radius: .25rem .25rem 0 0;
			/* box-shadow: inset 0 0 2px 0 #3a3a3a; */
			box-shadow: inset 0 -3px 0 0 var(--primary); 
			color: #3a3a3a;
			border: none;
			display: block;
			font-size: 1rem;
			line-height: 1.5rem;
			padding: .5rem 1rem;
			width: auto;
		}

		.input-label {
			color: #5a5a5a;
			display: block;
			font-size: 1rem;
			font-weight: 500;
			margin-bottom: .5rem;
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
		<h3>Renseignez le nom de la liste</h3>
		<label class="input-label" for="list">Nom de la liste</label>
		<input type="text" class="input-text" name="list" id="list" required>
		<div class="confirmation">
			<a id="btn-valider" class="btn">Valider</a>
			<a href="/pages/choice.php" class="btn cancel">Annuler</a>
		</div>
	</section>
</main>
<script>
    const btnValider = document.getElementById('btn-valider');

    btnValider.addEventListener('click', function() {
        const nomListe = document.getElementById('list').value;

        const urlConfirmation = `/pages/confirmation.php?choix=${encodeURIComponent(nomListe)}`;

        window.location.href = urlConfirmation;
    });
</script>
</body>
</html>

<?php include('../includes/footer.php'); ?>
