<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once  dirname(__FILE__)."../../vendor/autoload.php";
require_once  dirname(__FILE__)."/services/BaseService.class.php";
require_once  dirname(__FILE__)."/services/PetService.class.php";
require_once  dirname(__FILE__)."/services/SpeciesService.class.php";
require_once  dirname(__FILE__)."/services/UserService.class.php";



Flight::register('baseService', 'BaseService');
Flight::register('petsService', 'PetService');
Flight::register('speciesService', 'SpeciesService');
Flight::register('usersService', 'UserService');

Flight::route('/*',function(){
    //perform JWT decode
    $path = Flight::request()->url;
    
    if(preg_match("/public/.", $path)){
        return TRUE;
    };

    if($path == '/private/*'){
        $headers = getallheaders();
        if(@!$headers['Authorization']){
            Flight::json(["message" => "Authorization is missing"], 403);
            return FALSE;
        }else{
            try{
                $decoded = (array)JWT::decode($headers['Authorization'], new Key(Config::JWT_SECRET(), 'HS256'));
                Flight::set('user', $decoded);
                return TRUE;
            }catch(\Exception $e){
                Flight::json(["message" => "Authorization token is not valid"], 403);
                return FALSE;
            }
        }
    }
});

require_once __DIR__.'/routes/PetRoutes.php';
require_once __DIR__.'/routes/UserRoutes.php';
require_once __DIR__.'/routes/SpeciesRoutes.php';


Flight::start();

?>
