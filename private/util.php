<?php

use JetBrains\PhpStorm\NoReturn;

function array_has_all_keys(array $array, ...$keys): bool
{
    foreach ($keys as $key) {
        if (!array_key_exists($key, $array))
            return false;
    }
    return true;
}


#[NoReturn] function die_with_http_code(int $response_code, string $reason = ""): void
{
    http_response_code($response_code);
    die($reason);
}

#[NoReturn] function die_with_http_code_json(int $response_code, mixed $jsonObj): void
{
    http_response_code($response_code);
    header("content-type: application/json");
    die(json_encode($jsonObj));
}

function get_protocol(): string
{
    return (isset($_SERVER["HTTPS"]) ? "https://" : "http://");
}

function get_current_request_url(bool $reqParams): string
{
    return urlencode(get_protocol() . $_SERVER["HTTP_HOST"] . ($reqParams ? $_SERVER["REQUEST_URI"] : parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH)));
}

function datetime_from_timestamp(int $timestamp): DateTime
{
    $dt = new DateTime('now');
    $dt->setTimestamp($timestamp);
    return $dt;
}

#[NoReturn] function redirect(string $location): void
{
//    $casUrl = "https://cas.bordeaux-inp.fr/login" . "?service=" . get_current_request_url();
    header("Location: " . $location);
    die_with_http_code(302);
}