<?php
// $endpoint = 'http://127.0.0.1:8787/v2/blueoceangaming/callback';  //python
$endpoint = 'http://127.0.0.1:4000/v2/bo/games/callback';  //python

$contents = file_get_contents($endpoint . '?' . http_build_query($_GET));
if ($contents !== false) {
    echo $contents;
}
