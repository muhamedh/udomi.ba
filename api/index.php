<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once  dirname(__FILE__)."../../vendor/autoload.php";
require_once  dirname(__FILE__)."/dao/BaseDao.class.php";
require_once  dirname(__FILE__)."/dao/PetsDao.class.php";

Flight::register('basedao', 'BaseDao');

Flight::register('petsdao', 'PetsDao');


/**
* List all pets
*/
Flight::route('GET /pets', function(){
  Flight::json(Flight::petsdao()->get_all_pets());
});

/**
* List pet by id
*/
Flight::route('GET /pets/@pet_id', function($pet_id){
  Flight::json(Flight::petsdao()->get_pet_by_id($pet_id));
});

/**
* List pet by vaccine
*/

Flight::route('GET /pets/vac/@vaccinated', function($vaccinated){
  Flight::json(Flight::petsdao()->get_pets_by_vaccine($vaccinated));
});

/**
* List pet by age
*/

Flight::route('GET /pets/@timestamp', function($timestamp){
  Flight::json(Flight::petsdao()->get_pets_by_age($timestamp));
});

/**
* Add pet
*/
Flight::route('POST /pets', function(){
  Flight::json(Flight::petsdao()->insert_pet(Flight::request()->data->getData()));
});




Flight::start();
?>
