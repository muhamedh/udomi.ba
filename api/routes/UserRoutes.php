<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/** USERS ROUTES **/

/**
 * većinom je sve private da se ne bi guests mogli dočepat tuđih info kao
 * telefon i lokacija
 */

/*
* Get all users
* Works
* treba li i ova ruta?
* private
*/
Flight::route('GET /users', function () {
  Flight::json(Flight::usersService()->get_all());
});

/*
  * Get user by its id
  * Works
  * private
  */

Flight::route('GET /users/@user_id', function ($user_id) {
  Flight::json(Flight::usersService()->get_by_id($user_id, "user_id"));
});

/*
  * Get user by username
  * Works
  * private
  */

Flight::route('GET /users/username/@username', function ($username) {
  Flight::json(Flight::usersService()->getUsername($username));
});

/*
  * Insert a new user into the database
  * Works
  * register
  * guest
  */
Flight::route('POST /users', function () {
  $data = Flight::request()->data->getData();

  Flight::json(Flight::usersService()->add($data));
});

/*
  * Update user
  * Works
  * private
  */
Flight::route('PUT /users/@id', function ($id) {
  $data = Flight::request()->data->getData();
  Flight::usersService()->update($id,$data,"user_id");
  Flight::json(["message" => "updated"]);
});

/*
  * Delete a user by its id from the database
  * Works
  * private
  */
Flight::route('DELETE /users/@id', function ($id) {
  Flight::usersService()->delete($id,"user_id");
  Flight::json(["message" => "deleted"]);
});
