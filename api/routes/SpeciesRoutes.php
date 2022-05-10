<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/** SPECIES ROUTES **/
/*
* Get all species
* Works
*/
Flight::route('GET /species', function () {
  Flight::json(Flight::speciesService()->get_all());
});

/*
  * Get species by species_id
  * Works
  */

Flight::route('GET /species/@id', function ($id) {
  Flight::json(Flight::speciesService()->get_by_id($id, "species_id"));
});

/*
  * Get species by pets_id
  * Works
  */

Flight::route('GET /species/pets/@pets_id', function ($pets_id) {
  $data = Flight::speciesService()->get_species_by_pets_id($pets_id);
  Flight::json($data[0]);
});

/**
 * Add species
 * Works
 */
Flight::route('POST /species', function () {
  Flight::json(Flight::speciesService()->add(Flight::request()->data->getData()));
});

/**
 * Delete species by species_id
 * Works
 */
Flight::route('DELETE /species/@id', function($id){
  Flight::json(Flight::speciesService()->delete($id,"species_id"));
  Flight::json(["message" => "deleted"]);
});

?>