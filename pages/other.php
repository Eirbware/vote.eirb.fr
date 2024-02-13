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

		.input-error {
			box-shadow: inset 0 -3px 0 0 red;
		}

		.error-message {
			color: red;
			font-size: 0.8rem;
			margin-top: 0.5em;
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
		<input type="text" class="input-text" name="list" id="list" required maxlength="128">
		<div id="error-message" class="error-message"></div>
		<div class="confirmation">
			<a id="btn-valider" class="btn">Valider</a>
			<a href="/pages/choice.php" class="btn cancel">Annuler</a>
		</div>
	</section>
</main>
<script>
    const btnValider = document.getElementById('btn-valider');
    const inputListe = document.getElementById('list');
    const errorMessage = document.getElementById('error-message');

    btnValider.addEventListener('click', function() {
        const nomListe = inputListe.value;

        // Vérifier si l'input est vide
        if (nomListe.trim() === '') {
            // Afficher un message d'erreur sous l'input
            errorMessage.textContent = "Veuillez saisir un nom de liste.";
            // Ajouter une classe pour changer le style de l'input
            inputListe.classList.add('input-error');
            return;
        }

        // Vérifier si la longueur de l'entrée dépasse 64 caractères
        if (nomListe.length > 64) {
            // Afficher un message d'erreur sous l'input
            errorMessage.textContent = "Le nom de la liste ne peut pas dépasser 64 caractères.";
            // Ajouter une classe pour changer le style de l'input
            inputListe.classList.add('input-error');
            return;
        }

        // Si l'input n'est pas vide et la longueur est valide, continuer avec la confirmation
        const urlConfirmation = `/pages/confirmation.php?choix=${encodeURIComponent(nomListe)}`;
        window.location.href = urlConfirmation;
    });

    // Supprimer le message d'erreur et la classe d'erreur lorsque l'utilisateur commence à saisir dans l'input
    inputListe.addEventListener('input', function() {
        errorMessage.textContent = ''; // Effacer le message d'erreur
        inputListe.classList.remove('input-error'); // Supprimer la classe d'erreur
    });
</script>
</body>
</html>

<?php include('../includes/footer.php'); ?>