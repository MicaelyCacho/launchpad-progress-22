<?php
// Para cPanel que usa URLs temporárias como /~username/
// Este arquivo redirecionará automaticamente para o index.html
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$domainName = $_SERVER['HTTP_HOST'];
$requestUri = $_SERVER['REQUEST_URI'];

// Se a URL contém ~username, força o carregamento do index.html
if (strpos($requestUri, '~/') !== false || strpos($requestUri, '~') !== false) {
    include_once('index.html');
    exit();
}

// Caso contrário, redireciona normalmente
include_once('index.html');
?>