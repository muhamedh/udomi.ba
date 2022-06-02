<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


/** USERS ROUTES **/
// TODO - ovo nam ne treba?

/**
 * @OA\Get(path="/private/users", 
 *               tags={"users"},
 *               summary="Return all users from the API. ",
 *               security={
 *                          {
 *                           "ApiKeyAuth": {}
 *                          }
 *                        },
 *         @OA\Response(
 *             response=200, 
 *             description="List of users."
 *         ),
 *         @OA\Response(
 *             response=500, 
 *             description="Internal server error."
 *         ),
 *         @OA\Response(
 *             response=403, 
 *             description="Authorization is missing (JWT token not passed)"
 *         ),
 * )
 */
Flight::route('GET /private/users', function () {
  Flight::json(Flight::usersService()->get_all_restricted_users());
});

/**
* @OA\Get(path="/private/users/{user_id}",
*         tags={"users"},
*         summary="Return user by ID",
*               security={
*                         {
*                           "ApiKeyAuth": {}
*                         }
*                        },
*     @OA\Parameter(in="path", name="id", example=1, description="Return user with id"),
*     @OA\Response(
*         response="200",
*         description="Fetch user by id"
*         ),
*         @OA\Response(
*             response=403, 
*             description="Authorization is missing (JWT token not passed)"
*         ),
* )
*/
Flight::route('GET /private/users/@user_id', function ($user_id) {
  $user = Flight::get('user');

  if($user['user_id'] == $user_id){
    Flight::json(Flight::usersService()->get_restricted_user($user_id));
  }else{
    throw new Exception("This is hack you will be traced, be prepared :)");
  }

});

/**
* @OA\Get(path="/private/users/username/{username}",
*         tags={"users"},
*         summary="Return user by username",
*               security={
*                         {
*                           "ApiKeyAuth": {}
*                         }
*                        },
*     @OA\Parameter(in="path", name="username", example=1, description="Return user with provided username"),
*     @OA\Response(
*         response="200",
*         description="Fetch user by username"
*         ),
*         @OA\Response(
*             response=403, 
*             description="Authorization is missing (JWT token not passed)"
*         ),
* )
*/
Flight::route('GET /private/users/username/@username', function ($username) {
  Flight::json(Flight::usersService()->getUsername($username));
});

/**
* @OA\Post(
*     path="/public/login",
*     description="Logs in a user into the app",
*     tags={"users"},
*     @OA\RequestBody(description="Basic user login info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*           @OA\Property(property="user_mail", type="string", example="testing@test.t",	description="User email"),
*           @OA\Property(property="password", type="string", example="weakpassword",	description="User password"),
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="JWT Token"
*     ),
*     @OA\Response(
*         response=404,
*         description="User not found"
*     ),
* )
*/
Flight::route('POST /public/login', function () {
  
  $login = Flight::request()->data->getData();
  
  $user = Flight::usersService()->getMail($login['user_mail']);

  if(isset($user['user_id'])){
    if($user['password'] == md5($login['password'])){
      unset($user['password']);
      $jwt = JWT::encode($user, Config::JWT_SECRET(), 'HS256');
      Flight::json(['token' => $jwt]);
    }else{
      Flight::json(["message"=> "Wrong password"],404);
    }
  }else{
    Flight::json(array($user),404);
  }
});

/**
* @OA\Post(
*     path="/public/register",
*     description="Register a user into the app",
*     tags={"users"},
*     @OA\RequestBody(description="Basic user register info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*           @OA\Property(property="username", type="string", example="test",	description="Username"),
*           @OA\Property(property="user_mail", type="string", example="testing@test.t",	description="User email"),
*           @OA\Property(property="password", type="string", example="weakpassword",	description="User password"),
*           @OA\Property(property="phone_number", type="string", example="123123123",	description="User phonenumber"),
*           @OA\Property(property="city", type="string", example="City",	description="User city"),
*           @OA\Property(property="municipality", type="string", example="Municipality",	description="User municipality"),
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="JWT Token"
*     ),
*     @OA\Response(
*         response=404,
*         description="User not found"
*     ),
* )
*/
Flight::route('POST /public/register', function () {
  
  $data = Flight::request()->data->getData();
  unset($data['repeatpassword']);
  $data['password'] = md5($data['password']);
  
  $catch = Flight::usersService()->add($data);
  unset($catch['password']);
  
  $jwt = JWT::encode($catch, Config::JWT_SECRET(), 'HS256');
  Flight::json(['token' => $jwt]);

});
// TODO : I ovo nam ne treba
/**
* @OA\Post(
*     path="/private/users",
*     description="Add a user into the app",
*     tags={"users"},
*     security={
*               {
*                 "ApiKeyAuth": {}
*               }
*              },
*     @OA\RequestBody(description="Basic user info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*           @OA\Property(property="username", type="string", example="test",	description="Username"),
*           @OA\Property(property="user_mail", type="string", example="testing@test.t",	description="User email"),
*           @OA\Property(property="password", type="string", example="weakpassword",	description="User password"),
*           @OA\Property(property="phone_number", type="string", example="123123123",	description="User phonenumber"),
*           @OA\Property(property="city", type="string", example="City",	description="User city"),
*           @OA\Property(property="municipality", type="string", example="Municipality",	description="User municipality"),
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="User JSON object with ID"
*     )
* )
*/
Flight::route('POST /private/users', function () {
  $data = Flight::request()->data->getData();
  Flight::json(Flight::usersService()->add($data));
});

/**
* @OA\Put(
*     path="/private/users/{user_id}",
*     description="Update a user into the app",
*     tags={"users"},
*     security={
*               {
*                 "ApiKeyAuth": {}
*               }
*              },
*     @OA\Parameter(in="path", name="user_id", example=1, description="Update user with id"),
*     @OA\RequestBody(description="Basic user info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*           @OA\Property(property="username", type="string", example="test",	description="Username"),
*           @OA\Property(property="user_mail", type="string", example="testing@test.t",	description="User email"),
*           @OA\Property(property="password", type="string", example="weakpassword",	description="User password"),
*           @OA\Property(property="phone_number", type="string", example="123123123",	description="User phonenumber"),
*           @OA\Property(property="city", type="string", example="City",	description="User city"),
*           @OA\Property(property="municipality", type="string", example="Municipality",	description="User municipality"),
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="JSON object with message"
*     ),
*     @OA\Response(
*         response=404,
*         description="User not found"
*     ),
* )
*/
Flight::route('PUT /private/users/@id', function ($id) {
  $user = Flight::get('user');

  if($user['user_id'] == $id){
    
    $data = Flight::request()->data->getData();
    unset($data['password']);
    Flight::usersService()->update($id,$data,"user_id");
    Flight::json(["message" => "updated"]);

  }else{
    throw new Exception("This is hack you will be traced, be prepared :)");
  }


});
/** 
*   @OA\Delete(
*     path="/private/users/", security={{"ApiKeyAuth": {}}},
*     description="Hard delete user",
*     tags={"users"},
*     @OA\Response(
*         response=200,
*         description="User deleted"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error, may indicate JWT abuse"
*     )
* )
*/
Flight::route('DELETE /private/users/', function () {
  $user_to_delete = Flight::get('user');
  if(!isset($user_to_delete)){
    throw new Exception("This is hack you will be traced, be prepared :)");
  }

  Flight::usersService()->delete($user_to_delete['user_id'],"user_id");
  Flight::json(["message" => "deleted"]);
});
