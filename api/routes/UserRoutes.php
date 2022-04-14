<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/** USERS ROUTES **/
/*
* Get all users
* W
*/

Flight::route('GET /users', function(){
    Flight::json(Flight::usersService()->getAllUsers());
  });
  /*
  * Get user by its id
  * W
  */
  Flight::route('GET /users/@user_id', function($user_id){
    Flight::json(Flight::usersService()->getUserById($user_id));
  });
  
  /*
  * Get user by username
  * L -> assigned Rania
  */
  
  Flight::route('GET /users/@username', function($username){
    Flight::json(Flight::usersService()->getUsername($username));
  });
  /*
  * Insert a new user into the database
  * W
  */
  Flight::route('POST /users', function(){
    Flight::json(Flight::usersService()->insertUser(Flight::request()->data->getData()));
  });
  
  /*
  * Update username
  * W
  * There is a way in autoresponser/todos
  */
  Flight::route('PUT /users/username/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::usersService()->updateUsername($data,$id);
    Flight::json(['message' => 'updated']);
  });
  
  /*
  * Delete a user by its id from the database
  * W
  */
  Flight::route('DELETE /users/@id', function($id){
    Flight::usersService()->deleteUser($id);
    Flight::json(["message" => "deleted"]);
  });

?>