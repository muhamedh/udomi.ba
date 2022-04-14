<?php

/** USERS ROUTES **/
/*
* Get all users
* W
*/

Flight::route('GET /users', function(){
    Flight::json(Flight::usersdao()->getAllUsers());
  });
  /*
  * Get user by its id
  * W
  */
  Flight::route('GET /users/@user_id', function($user_id){
    Flight::json(Flight::usersdao()->getUserById($user_id));
  });
  
  /*
  * Get user by username
  * L -> assigned Rania
  */
  
  Flight::route('GET /users/@username', function($username){
    Flight::json(Flight::usersdao()->getUsername($username));
  });
  /*
  * Insert a new user into the database
  * W
  */
  Flight::route('POST /users', function(){
    Flight::json(Flight::usersdao()->insertUser(Flight::request()->data->getData()));
  });
  
  /*
  * Update username
  * W
  * There is a way in autoresponser/todos
  */
  Flight::route('PUT /users/username/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::usersdao()->updateUsername($data,$id);
    Flight::json(['message' => 'updated']);
  });
  
  /*
  * Delete a user by its id from the database
  * W
  */
  Flight::route('DELETE /users/@id', function($id){
    Flight::usersdao()->deleteUser($id);
    Flight::json(["message" => "deleted"]);
  });

?>