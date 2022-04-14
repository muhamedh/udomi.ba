<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once  dirname(__FILE__)."../../vendor/autoload.php";
require_once  dirname(__FILE__)."/dao/BaseDao.class.php";
require_once  dirname(__FILE__)."/dao/PetsDao.class.php";
require_once  dirname(__FILE__)."/dao/SpeciesDao.class.php";
require_once  dirname(__FILE__)."/dao/UsersDao.class.php";

Flight::register('basedao', 'BaseDao');
Flight::register('petsdao', 'PetsDao');
Flight::register('speciesdao', 'SpeciesDao');
Flight::register('usersdao', 'UsersDao');


require_once __DIR__.'/routes/PetRoutes.php';
require_once __DIR__.'/routes/UserRoutes.php';
require_once __DIR__.'/routes/SpeciesRoutes.php';





Flight::start();
?>
