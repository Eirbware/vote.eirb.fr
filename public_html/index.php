<?php
require_once __DIR__ . '/../private/auth.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Index</title>
</head>
<body>
    <h1>Welcome, <?php echo $_SESSION['user']['nom_complet']; ?></h1>
    <p><a href="logout.php">Logout</a></p>
</body>
</html>
