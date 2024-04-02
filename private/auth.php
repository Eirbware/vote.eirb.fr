<?php
require_once __DIR__ . '/util.php';

session_start();
$url = get_current_request_url(false);

function redirect_cas(): void
{
	global $url;
    redirect("https://cas.bordeaux-inp.fr/login" . "?service=" . $url);
}

function validate_cas_token(string $casToken)
{
	global $url;
    $validationUrl = "https://cas.bordeaux-inp.fr/p3/serviceValidate" . "?ticket=$casToken&service=$url&format=json";
    $ch = curl_init($validationUrl);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);

    $resStr = curl_exec($ch);
    curl_close($ch);
    $res = json_decode($resStr, true);
    if (array_key_exists("authenticationFailure", $res["serviceResponse"])) {
		error_log("CAS validation failed: " . $res["serviceResponse"]["authenticationFailure"]["code"]);
        redirect_cas();
    }
    return $res;
}

if(!isset($_SESSION["user"])){
    if(!isset($_GET["ticket"])){
        redirect_cas();
    }
    $res = validate_cas_token($_GET["ticket"])["serviceResponse"]["authenticationSuccess"]["attributes"];
    $ecole = $res["ecole"][0];
    $profil = $res["profil"][0];
    $login = $res["uid"][0];

    if(strcmp($login, "halves") != 0) {
        if(strcmp($ecole, "enseirb-matmeca") != 0)
            die_with_http_code(403, "<h1>Forbidden</h1><br>Il faut être à l'enseirb-matmeca");
        if(strcmp($profil, "student") != 0)
            die_with_http_code(403, "<h1>Forbidden</h1><br>Il faut être un élève.");
    }

    $nom_complet = $res["nom_complet"][0];
    $diplome = $res["diplome"][0];
    $_SESSION["user"] = ["ecole" => $ecole, "nom_complet" => $nom_complet, "diplome" => $diplome, "login" => $login];
}

?>