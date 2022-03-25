<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once dirname(__FILE__)."/dao/PetsDao.class.php";
require_once dirname(__FILE__)."/dao/SpeciesDao.class.php";


$pet = new PetsDao();

$new_pet = [
  "petname" => "Rani",
  "users_user_id" => "1",
  "species_species_id" => "1",
  "pet_birtdate" => "2020-07-24",
  "vaccinated" => "1"
];

$res = $pet->insert_pet($new_pet);

print_r($res);

print_r($pet->get_all_pets());
*/
/*
$species = new SpeciesDao();
/*
$spec = $species->get_species_by_pets_id(4);

print_r($spec);*/
/*
$new_species = array(":name" => "Kornjaca");

$species->insert_species($new_species);
*/
echo "runs";

?>
