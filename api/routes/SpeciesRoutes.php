<?php

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

  /**
   * Add species
   * T
   */
  Flight::route('POST /species', function(){
    Flight::json(Flight::speciesdao()->insert_species(Flight::request()->data->getData()));
  });

?>