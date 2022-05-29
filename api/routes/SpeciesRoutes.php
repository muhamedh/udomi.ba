<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/** SPECIES ROUTES **/

/**
 * @OA\Get(path="/public/species", tags={"species"},
 *         summary="Return all species from the API. ",
 *         @OA\Response( response=200, description="List of species.")
 * )
 */
Flight::route('GET /public/species', function () {
  Flight::json(Flight::speciesService()->get_all());
});

/**
* @OA\Get(path="/public/species/{id}", tags={"species"},summary="Return species by ID",
*     @OA\Parameter(in="path", name="id", example=1, description="Return species with id"),
*     @OA\Response(response="200", description="Fetch species by id")
* )
*/
Flight::route('GET /public/species/@id', function ($id) {
  Flight::json(Flight::speciesService()->get_by_id($id, "species_id"));
});

/**
* @OA\Get(path="/public/species/pets/{pets_id}", tags={"species"},summary="Return species by ID",
*     @OA\Parameter(in="path", name="pets_id", example=1, description="Return the species of the pet with provided id"),
*     @OA\Response(response="200", description="Get species of pet by the pet ID")
* )
*/
Flight::route('GET /public/species/pets/@pets_id', function ($pets_id) {
  $data = Flight::speciesService()->get_species_by_pets_id($pets_id);
  Flight::json($data[0]);
});

/**
* @OA\Post(
*     path="/private/species",
*     description="Add a new pet to the system",
*     tags={"species"},
*     security={{"ApiKeyAuth": {}}},
*     @OA\RequestBody(description="Basic species info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*           @OA\Property(property="name", type="string", example="Bee",	description="Species name"),
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
Flight::route('POST /private/species', function () {
  Flight::json(Flight::speciesService()->add(Flight::request()->data->getData()));
});

/**
 * Delete species by species_id
 * Works
 * i ovo bi se moglo brisat
 * private
 */
Flight::route('DELETE /private/species/@id', function($id){
  Flight::json(Flight::speciesService()->delete($id,"species_id"));
  Flight::json(["message" => "deleted"]);
});

?>