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
  
/**
* @OA\Get(path="/public/pets/younger/{timestamp}", tags={"pets"},summary="Returns pets which are younger than the provided date",
*     @OA\Parameter(in="path", name="boolean", example=1, description="Return all pets that are younger than the provided date. Date is of form YYYY-MM-DD"),
*     @OA\Response(response="200", description="Fetch younger pets")
* )
*/  
Flight::route('GET /public/pets/younger/@timestamp', function($timestamp){
  Flight::json(Flight::petsService()->get_younger_pets($timestamp));
});
  
/**
* @OA\Post(
*     path="/private/pets",
*     description="Add a new pet to the system",
*     tags={"pets"},
*     security={{"ApiKeyAuth": {}}},
*     @OA\RequestBody(description="Basic pets info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*           @OA\Property(property="petname", type="string", example="Root",	description="Pet name"),
*           @OA\Property(property="pet_birthdate", type="date", example="2020-02-02",	description="Pet birthdate in YYYY-MM-DD form"),
*    				@OA\Property(property="vaccinated", type="string", example="0",	description="1 - vaccinated, 0 - not vaccinated"),
*           @OA\Property(property="photos_url", type="string", example="yourpetpicture.lala",	description="Hosted URL - picture of your pet"),
*           @OA\Property(property="pets_description", type="string", example="This is a sample description",	description="Pets description"),
*           @OA\Property(property="pet_gender", type="string", example="0",	description="0 - for male, 1 - for female"),
*           @OA\Property(property="adopted", type="string", example="0",	description="0 - for not adopted, 1 - for adopted"),
*           @OA\Property(property="species_id", type="string", example="1",	description="Foreign key to species table - specify the species"),
*           @OA\Property(property="owner_id", type="string", example="1",	description="Foreign key to users table - specify the user")
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Pets object with primary key added"
*     ),
*     @OA\Response(
*         response=404,
*         description="Unexpected error"
*     ),
*     @OA\Response(
*         response=403,
*         description="JWT token not passed"
*     )
* )
*/
Flight::route('POST /private/pets', function(){
  Flight::json(Flight::petsService()->add(Flight::request()->data->getData()));
});
/**
 * TO ADD DOCUMENTATION
 */
Flight::route('DELETE /private/pets/@id', function($id){
  Flight::petsService()->delete($id, "pets_id");
  Flight::json(["message" => "deleted"]);
});

/**
* @OA\Put(
*     path="/private/pets/{pets_id}",
*     description="Update a pet to the system",
*     tags={"pets"},
*     @OA\Parameter(in="path", name="pets_id", example=1, description="ID of pet we want to update"),
*     security={{"ApiKeyAuth": {}}},
*     @OA\RequestBody(description="Update pets info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*           @OA\Property(property="petname", type="string", example="Root",	description="Pet name"),
*           @OA\Property(property="pet_birthdate", type="date", example="2020-02-02",	description="Pet birthdate in YYYY-MM-DD form"),
*    				@OA\Property(property="vaccinated", type="string", example="0",	description="1 - vaccinated, 0 - not vaccinated"),
*           @OA\Property(property="photos_url", type="string", example="yourpetpicture.lala",	description="Hosted URL - picture of your pet"),
*           @OA\Property(property="pets_description", type="string", example="This is a sample description",	description="Pets description"),
*           @OA\Property(property="pet_gender", type="string", example="0",	description="0 - for male, 1 - for female"),
*           @OA\Property(property="adopted", type="string", example="0",	description="0 - for not adopted, 1 - for adopted"),
*           @OA\Property(property="species_id", type="string", example="1",	description="Foreign key to species table - specify the species"),
*           @OA\Property(property="owner_id", type="string", example="1",	description="Foreign key to users table - specify the user")
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Pets object with primary key updated"
*     ),
*     @OA\Response(
*         response=404,
*         description="Unexpected error"
*     ),
*     @OA\Response(
*         response=403,
*         description="JWT token not passed"
*     )
* )
*/
Flight::route('PUT /private/pets/@id', function($id){
  $data = Flight::request()->data->getData();
  Flight::petsService()->update($id,$data,"pets_id");
  Flight::json(["message" => "updated"]);
});

/**
* @OA\Get(path="/public/pets/owner/{owner_id}", tags={"pets"},summary="Return pets owned by owner ID",
*     @OA\Parameter(in="path", name="owner_id", example=1, description="Owner ID"),
*     @OA\Response(response="200", description="Fetched pets owned by.")
* )
*/
Flight::route('GET /public/pets/owner/@owner_id', function($owner_id){
  Flight::json(Flight::petsService()->get_by_owner($owner_id));
});

?>