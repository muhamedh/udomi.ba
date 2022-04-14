<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/// ALL PETS TABLE ROUTES

/**
* List all pets
* W
*/
Flight::route('GET /pets', function(){
    Flight::json(Flight::petsService()->get_all());
  });
  
  /**
  * List pet by id
  * W
  */
  Flight::route('GET /pets/@pet_id', function($pet_id){
    Flight::json(Flight::petsService()->get_by_id($pet_id, "pets_id"));
  });
  
  /**
  * List pet by vaccine
  * W
  */
  
  Flight::route('GET /pets/vac/@vaccinated', function($vaccinated){
    Flight::json(Flight::petsService()->get_pets_by_vaccine($vaccinated));
  });
  
  /*
  * Get female pets
  * W
  */
  Flight::route('GET /pets/gender/@gender', function($gender){
    Flight::json(Flight::petsService()->get_by_gender($gender));
  });
  
  /**
  * List all pets which are older than provided date
  * W
  */
  Flight::route('GET /pets/older/@timestamp', function($timestamp){
    Flight::json(Flight::petsService()->get_older_pets($timestamp));
  });
  
  /*
  * List all pets which are younger than provided date
  * W
  */
  Flight::route('GET /pets/younger/@timestamp', function($timestamp){
    Flight::json(Flight::petsService()->get_younger_pets($timestamp));
  });
  
  /**
  * Add pet to database
  * W
  */
  Flight::route('POST /pets', function(){
    Flight::json(Flight::petsService()->insert_pet(Flight::request()->data->getData()));
  });
  
  /**
  * Delete pet by its id
  * W
  */
  Flight::route('DELETE /pets/@id', function($id){
    Flight::petsService()->deletePet($id);
    Flight::json(["message" => "deleted"]);
  });

//add update

?>