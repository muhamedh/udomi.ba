<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once dirname(__FILE__)."/dao/PetsDao.class.php";


$pet = new PetsDao();

$new_pet = [
  "petname" => "Smrdo",
  "users_user_id" => "1",
  "species_species_id" => "1",
  "pet_birtdate" => "2020-07-24",
  "vaccinated" => "1"
];

$res = $pet->insert_pet($new_pet);

print_r($res);

echo "runs";

?>
