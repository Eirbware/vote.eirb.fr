<?php
include('private/config.php');
$deadline = DEADLINE;

$currentDate = time();

// Vérifie si la date actuelle est après la date de fin du vote
if ($currentDate > $deadline) {
    header("Location: /pages/error.php?returnCode=NO_VOTE");
    exit; 
}
?>

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
                <p style="margin: 0;">Le vote des campagnes se termine dans <span id="countdown"></span></p>
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
			<a rel="nofollow">
				<img src="/assets/images/kalashcrimineirb.png" class="card-logo">
				<div class="card-text-box">
					<h4>Kalashcri<br>min'eirb</h4>
					<p>Votez pour votre liste préférée</p>
					<img src="/assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
				</div>
			</a>
        </div>
        <a href="/pages/choice.php" class="btn">Passer au vote</a>
    </section>
</main>
<script>
    const targetDate = new Date(<?php echo json_encode(date('Y-m-d\TH:i:s', $deadline)); ?>); // Utilisation de la variable PHP deadline
    
    function updateCountdown() {
        const currentDate = new Date();

        const difference = Math.abs(targetDate - currentDate);

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerText = `${days}j ${hours}h ${minutes}min ${seconds}s`;
    }

    setInterval(updateCountdown, 1000);

    updateCountdown();
</script>
</body>
</html>

<?php include('includes/footer.php'); ?>
