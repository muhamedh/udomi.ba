<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/**
 * ALL PETS TABLE ROUTES
 */

 /**
  * trebali bi dodat lokaciju peta u bazi
  * get pet by location
  * get pet by not adopted
  */

/**
* List all pets
* Works
* guest
*/

Flight::route('GET /pets', function(){
    Flight::json(Flight::petsService()->get_all());
});
  
/**
* List pet by id
* Works
* guest
*/

Flight::route('GET /pets/@pet_id', function($pet_id){
  Flight::json(Flight::petsService()->get_by_id($pet_id, "pets_id"));
});
  
/**
* List pet by vaccine
* Works
* guest
*/
  
Flight::route('GET /pets/vac/@vaccinated', function($vaccinated){
  Flight::json(Flight::petsService()->get_pets_by_vaccine($vaccinated));
});
  
/*
* Get pet by gender
* Works
* guest
*/
Flight::route('GET /pets/gender/@gender', function($gender){
  Flight::json(Flight::petsService()->get_by_gender($gender));
});
  
/**
* List all pets which are older than provided date
* Works
* guest
*/
Flight::route('GET /pets/older/@timestamp', function($timestamp){
  Flight::json(Flight::petsService()->get_older_pets($timestamp));
});
  
/*
* List all pets which are younger than provided date
* Works
* guest
*/
Flight::route('GET /pets/younger/@timestamp', function($timestamp){
  Flight::json(Flight::petsService()->get_younger_pets($timestamp));
});
  
/**
* Add pet to database
* Works
* private
*/
Flight::route('POST /pets', function(){
  Flight::json(Flight::petsService()->add(Flight::request()->data->getData()));
});
  
/**
* Delete pet by its id
* Works
*/
Flight::route('DELETE /pets/@id', function($id){
  Flight::petsService()->delete($id, "pets_id");
  Flight::json(["message" => "deleted"]);
});

/**
 * Update pet by its id
 * Works
 * private
 */
Flight::route('PUT /pets/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::petsService()->update($id,$data,"pets_id");
  Flight::json(["message" => "updated"]);
});

/**
 * Get pet by owner id
 * Works
 * samo da možeš vidjet svoje pets
 * private
 */
Flight::route('GET /pets/owner/@owner_id', function($owner_id){
  Flight::json(Flight::petsService()->get_by_owner($owner_id));
});

?>