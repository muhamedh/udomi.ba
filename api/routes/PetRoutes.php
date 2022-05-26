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
 * @OA\Get(path="/public/pets", tags={"pets"},
 *         summary="Return all pets from the API. ",
 *         @OA\Response( response=200, description="List of pets.")
 * )
 */
Flight::route('GET /public/pets', function(){
    Flight::json(Flight::petsService()->get_all());
});

/**
* @OA\Get(path="/public/pets/{id}", tags={"pets"},summary="Return pet by ID",
*     @OA\Parameter(in="path", name="id", example=1, description="Return pet with id"),
*     @OA\Response(response="200", description="Fetch pet by id")
* )
*/
Flight::route('GET /public/pets/@pet_id', function($pet_id){
  Flight::json(Flight::petsService()->get_by_id($pet_id, "pets_id"));
});
  

/**
* @OA\Get(path="/public/pets/vac/{boolean}", tags={"pets"},summary="Returns pets which are vaccinated or not",
*     @OA\Parameter(in="path", name="boolean", example=1, description="Return all vaccinated pets if 1 is provided and not vaccinated pets if 0 is provided"),
*     @OA\Response(response="200", description="Fetch vaccinated/not vaccinated")
* )
*/  
Flight::route('GET /public/pets/vac/@vaccinated', function($vaccinated){
  Flight::json(Flight::petsService()->get_pets_by_vaccine($vaccinated));
});
  
/**
* @OA\Get(path="/public/pets/gender/{boolean}", tags={"pets"},summary="Returns pets which are female or male",
*     @OA\Parameter(in="path", name="boolean", example=1, description="Return all female pets if 1 is provided and male pets if 0 is provided"),
*     @OA\Response(response="200", description="Fetch female/male pets")
* )
*/  
Flight::route('GET /public/pets/gender/@gender', function($gender){
  Flight::json(Flight::petsService()->get_by_gender($gender));
});
  
/**
* @OA\Get(path="/public/pets/older/{timestamp}", tags={"pets"},summary="Returns pets which are older than the provided date",
*     @OA\Parameter(in="path", name="boolean", example=1, description="Return all pets that are older than the provided date. Date is of form YYYY-MM-DD"),
*     @OA\Response(response="200", description="Fetch older pets")
* )
*/  
Flight::route('GET /public/pets/older/@timestamp', function($timestamp){
  Flight::json(Flight::petsService()->get_older_pets($timestamp));
});
  
/*
* List all pets which are younger than provided date
* Works
* guest
*/
Flight::route('GET /public/pets/younger/@timestamp', function($timestamp){
  Flight::json(Flight::petsService()->get_younger_pets($timestamp));
});
  
/**
* Add pet to database
* Works
* private
*/
Flight::route('POST /private/pets', function(){
  Flight::json(Flight::petsService()->add(Flight::request()->data->getData()));
});
  
/**
* Delete pet by its id
* Works
*/
Flight::route('DELETE /private/pets/@id', function($id){
  Flight::petsService()->delete($id, "pets_id");
  Flight::json(["message" => "deleted"]);
});

/**
 * Update pet by its id
 * Works
 * private
 */
Flight::route('PUT /private/pets/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::petsService()->update($id,$data,"pets_id");
  Flight::json(["message" => "updated"]);
});

/**
 * Get pet by owner id
 * Works
 * samo da možeš vidjet svoje pets
 * public
 */
Flight::route('GET /public/pets/owner/@owner_id', function($owner_id){
  Flight::json(Flight::petsService()->get_by_owner($owner_id));
});

?>