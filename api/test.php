<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once dirname(__FILE__)."/dao/PetsDao.class.php";


$pet = new PetsDao();
$res = $pet->get_pets_by_vaccine(0);

print_r($res);

echo "runs";

?>
