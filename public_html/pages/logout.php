<?php
session_start();
$_SESSION = array();
// clear cas token GET variable
$_GET = array();
session_destroy();
header("Location: https://cas.bordeaux-inp.fr/logout");
exit();
?>
