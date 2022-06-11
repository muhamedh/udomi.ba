<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/** SPECIES ROUTES **/

/**
 * @OA\Get(path="/public/pets_photos", tags={"pets_photos"},
 *         summary="Return all pet photos from the API. ",
 *         @OA\Response( response=200, description="List of photo URLs")
 * )
 */
Flight::route('GET /public/pets_photos', function () {
  Flight::json(Flight::petsPhotosService()->get_all());
});


?>