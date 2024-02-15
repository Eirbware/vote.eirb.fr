<?php
require_once('../../private/config.php');

require_once('../../private/auth.php');

// define $_admins in private/config.php

if (!in_array($_SESSION['user']['login'], $_admins)) {
	die_with_http_code(403);
}

echo "admin page !";

?>


