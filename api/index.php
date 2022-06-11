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
require_once  dirname(__FILE__)."/services/MunicipalitiesService.class.php";
require_once  dirname(__FILE__)."/services/PetsPhotosService.class.php";

Flight::register('baseService', 'BaseService');
Flight::register('petsService', 'PetService');
Flight::register('speciesService', 'SpeciesService');
Flight::register('usersService', 'UserService');
Flight::register('municipalitiesService', 'MunicipalitiesService');
Flight::register('petsPhotosService', 'PetsPhotosService');

Flight::map('query', function($name, $default_value = ""){
        
    $request = Flight::request();
    
    $query_param = @$request->query->getData()[$name];
    
    $query_param = $query_param ? $query_param : $default_value;
    
    return urldecode($query_param);
}); 


Flight::route('/*',function(){
    //perform JWT decode


    $path = Flight::request()->url;
    $parsed = (array) preg_match('/^\/public\/.*/', $path, $parsed);
    if($path == '/docs.json'){
        return TRUE;
    }
    if($parsed["0"]){
        return TRUE;
    };

    $parsed = (array) preg_match('/^\/private\/.*/', $path, $parsed);
    
    if($parsed["0"]){
        
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

Flight::route('GET /docs.json', function(){
    
    $openapi = \OpenApi\scan('routes');
    header('Content-Type: application/json');
    echo $openapi->toJson();
});


require_once __DIR__.'/routes/PetRoutes.php';
require_once __DIR__.'/routes/UserRoutes.php';
require_once __DIR__.'/routes/SpeciesRoutes.php';
require_once __DIR__.'/routes/MunicipalitiesRoutes.php';
require_once __DIR__.'/routes/PetsPhotosRoutes.php';

Flight::start();

?>
