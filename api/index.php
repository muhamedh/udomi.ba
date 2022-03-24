<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once DIRNAME(__FILE__).'dao/';

Flight::register('basedao', 'BaseDao');

Flight::register('petsdao', 'PetsDao');
/**
* List all pets
*/
Flight::route('GET /pets', function(){
  Flight::json(Flight::petsdao()->get_all_pets());
});
?>
