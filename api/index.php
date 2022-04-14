<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once  dirname(__FILE__)."../../vendor/autoload.php";
require_once  dirname(__FILE__)."/services/BaseService.class.php";
require_once  dirname(__FILE__)."/services/PetService.class.php";
//require_once  dirname(__FILE__)."/services/SpeciesService.class.php";
require_once  dirname(__FILE__)."/services/UserService.class.php";

Flight::register('baseService', 'BaseService');
Flight::register('petsService', 'PetService');
//Flight::register('speciesService', 'SpeciesService');
Flight::register('usersService', 'UserService');

require_once __DIR__.'/routes/PetRoutes.php';
require_once __DIR__.'/routes/UserRoutes.php';
require_once __DIR__.'/routes/SpeciesRoutes.php';


Flight::start();

?>
