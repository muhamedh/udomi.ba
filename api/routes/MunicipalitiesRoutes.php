<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/** SPECIES ROUTES **/

/**
 * @OA\Get(path="/public/municipalities", tags={"municipalities"},
 *         summary="Return all municipalities from the API. ",
 *         @OA\Response( response=200, description="List of municipalities.")
 * )
 */
Flight::route('GET /public/municipalities', function () {
  Flight::json(Flight::municipalitiesService()->get_all());
});


?>