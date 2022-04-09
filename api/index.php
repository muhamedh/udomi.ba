<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once  dirname(__FILE__)."../../vendor/autoload.php";
require_once  dirname(__FILE__)."/dao/BaseDao.class.php";
require_once  dirname(__FILE__)."/dao/PetsDao.class.php";
require_once  dirname(__FILE__)."/dao/SpeciesDao.class.php";
require_once  dirname(__FILE__)."/dao/UsersDao.class.php";

Flight::register('basedao', 'BaseDao');
Flight::register('petsdao', 'PetsDao');
Flight::register('speciesdao', 'SpeciesDao');
Flight::register('usersdao', 'UsersDao');

/// ALL PETS TABLE ROUTES

/**
* List all pets
* W
*/
Flight::route('GET /pets', function(){
  Flight::json(Flight::petsdao()->get_all_pets());
});

/**
* List pet by id
* W
*/
Flight::route('GET /pets/@pet_id', function($pet_id){
  Flight::json(Flight::petsdao()->get_pet_by_id($pet_id));
});

/**
* List pet by vaccine
* W
*/

Flight::route('GET /pets/vac/@vaccinated', function($vaccinated){
  Flight::json(Flight::petsdao()->get_pets_by_vaccine($vaccinated));
});

/*
* Get female pets
* W
*/
Flight::route('GET /pets/gender/@gender', function($gender){
  Flight::json(Flight::petsdao()->get_by_gender($gender));
});

/**
* List all pets which are older than provided date
* W
*/
Flight::route('GET /pets/older/@timestamp', function($timestamp){
  Flight::json(Flight::petsdao()->get_older_pets($timestamp));
});

/*
* List all pets which are younger than provided date
* W
*/
Flight::route('GET /pets/younger/@timestamp', function($timestamp){
  Flight::json(Flight::petsdao()->get_younger_pets($timestamp));
});

/**
* Add pet to database
* W
*/
Flight::route('POST /pets', function(){
  Flight::json(Flight::petsdao()->insert_pet(Flight::request()->data->getData()));
});

/**
* Delete pet by its id
* W
*/
Flight::route('DELETE /pets/@id', function($id){
  Flight::petsdao()->deletePet($id);
  Flight::json(["message" => "deleted"]);
});

/** SPECIES ROUTES **/
/*
* Get all species
* W
*/
Flight::route('GET /species', function(){
  Flight::json(Flight::speciesdao()->get_all_species());
});

/*
* Get species by species_id
* W
*/

Flight::route('GET /species/@id', function($id){
  Flight::json(Flight::speciesdao()->get_species_by_id($id));
});

/*
* Get species by pets_id
* W
*/

Flight::route('GET /species/pets/@pets_id', function($pets_id){
  Flight::json(Flight::speciesdao()->get_species_by_pets_id($pets_id));
});


/** USERS ROUTES **/
/*
* Get all users
* W
*/

Flight::route('GET /users', function(){
  Flight::json(Flight::usersdao()->getAllUsers());
});
/*
* Get user by its id
* W
*/
Flight::route('GET /users/@user_id', function($user_id){
  Flight::json(Flight::usersdao()->getUserById($user_id));
});

/*
* Get user by username
* L -> assigned Rania
*/

Flight::route('GET /users/@username', function($username){
  Flight::json(Flight::usersdao()->getUsername($username));
});
/*
* Insert a new user into the database
* W
*/
Flight::route('POST /users', function(){
  Flight::json(Flight::usersdao()->insertUser(Flight::request()->data->getData()));
});

/*
* Update username
* W
* This route is not up to ideal coding practices, this routes should be generalized to the form
* it does not care how many parameters we want to update, it updates them (might be impossible)
*/
/*
* Sada ako zelimo promjeniti username + email ili samo email kako cemo razlikovati ovo?
*/
Flight::route('PUT /users/@id', function($id){
  $request = Flight::request();
  $data = $request->data->getData();
  Flight::usersdao()->updateUsername($data,$id);
  Flight::json(['message' => 'updated']);
});

/*
* Delete a user by its id from the database
* W
*/
Flight::route('DELETE /users/@id', function($id){
  Flight::usersdao()->deleteUser($id);
  Flight::json(["message" => "deleted"]);
});

Flight::start();
?>
