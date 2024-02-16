<?php

include('../private/config.php');

// Connexion à la base de données
$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("La connexion à la base de données a échoué: " . $conn->connect_error);
}

// Récupération de la date de début et de fin du vote
$stmt = $conn->prepare("SELECT dateOuvertureVotes, dateFermetureVotes FROM Campagnes WHERE id = ?");
$stmt->bind_param("i", $IDCAMPAGNE_EN_COURS);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($dateOuvertureVotes, $dateFermetureVotes);
$stmt->fetch();
$stmt->close();

// Conversion des dates en timestamp
$startDate = strtotime($dateOuvertureVotes);
$endDate = strtotime($dateFermetureVotes);

// Date et heure actuelles
$currentDate = time();

// Vérifie si la date actuelle est après la date de début et avant la date de fin du vote
if ($currentDate < $startDate) {
    header("Location: /pages/error.php?returnCode=403&error=L'ouverture du vote est imminente...");
    exit;
}

if ($currentDate > $endDate) {
    header("Location: /pages/error.php?returnCode=403&error=Le vote est actuellement fermé.");
    exit;
}
?>

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

        .btn-inv {
            background-color: #fff;
            color: var(--accent)
        }

        ::backdrop {
            background-color: black;
            opacity: 0.6;
        }

        .modal_dialog {
            margin-top: 40px;
            padding: 20px;
            font-size: 17px;
            font-weight: 500;
            max-width: 700px;
            border: 0;
            box-shadow: 0 5px 15px 0 rgba(0,0,0,0.5);
        }
            
        .modal_dialog .btn {
            margin-top: 2em;
        }
        
        .modal_dialog h4 {
            color: var(--primary);
            margin-top: 10px;
        }
        
        .modal_dialog p a {
            color: black;
            text-decoration: none;
        }

        @media screen and (max-width: 900px) {
            .modal_dialog {
                margin: 3vw;
                max-width: 900px;
            }

            .modal_dialog .btn {
                margin-top: 1vw;
            }
        }
    </style>
</head>
<body>
<?php include('pages/header.php'); ?>
<main>
    <h2>Élection du Bureau Des Élèves 2024</h2>
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
                    <p>Visitez le site de Mafi'eirb</p>
                    <img src="assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
                </div>
            </a>
            <a href="https://dionys.eirb.fr/" rel="nofollow">
                <img src="assets/images/dionyseirb.png" class="card-logo">
                <div class="card-text-box">
                    <h4>Dionys'eirb</h4>
                    <p>Visitez le site de Dionys'eirb</p>
                    <img src="assets/images/arrow-right-short.svg" class="arrow" alt="flèche vers la droite">
                </div>
            </a>
        </div>
        <dialog class="modal_dialog">
            <h4>Confidentialité</h4>
            <p>
                En vous connectant, vous acceptez que vos données personnelles soient traitées par Eirbware.
                <br><br>
                Nous recueillons:
                <br>
                • Votre identifiant de connexion au CAS de l'ENSEIRB-MATMECA
                <br>
                <br>    
                Ces données sont utilisées dans le seul but de pouvoir fournir le service que vous utilisez, et seuls les membres
                d'Eirbware peuvent accéder à ces données.
                <br>
                <br>
                À tout moment, vous pouvez demander la suppression ou bien la modification de vos informations en nous envoyant un
                mail à <a href="mailto:eirbware@enseirb-matmeca.fr" class="text-warning">eirbware@enseirb-matmeca.fr</a>.
                <br>
                <br>
                Les données récoltées seront supprimées à la fin de votre scolarité.
            <p>
            <div class="buttons" style="float: right">
                <button class="btn btn-inv">Annuler</button>
                <a href="/pages/choice.php"><button autofocus class="btn">Confirmer</button></a>
            </div>
        </dialog>
        <button class="btn">Passer au vote</button>
    </section>
</main>
<?php include('pages/footer.php'); ?>
<script>
    const targetDate = new Date(<?php echo json_encode(date('Y-m-d\TH:i:s', $endDate)); ?>); // Utilisation de la variable PHP deadline
    
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

    const dialog = document.querySelector("dialog");

    document.querySelector("dialog + button").addEventListener("click", () => {
        dialog.showModal();
    });

    document.querySelector("dialog button").addEventListener("click", () => {
        dialog.close();
    });
</script>
</body>
</html>
