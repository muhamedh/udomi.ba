<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__)."/BaseDao.class.php";

class UsersDao extends BaseDao{

  //get all users
  public function getAllUsers(){
    return $this->get_all();
  }

  //get user based on id
  public function getUserById($user_id){
    return $this->get_by_id($user_id, "user_id");
  }

  //get user based on username
  //might use query unique
  public function getUsername($username){
    return $this->query_with_params("SELECT * FROM users WHERE username=:username", ['username' => $username]);
  }

  ////get user based on email
  public function getMail($mail){
    return $this->query_with_params("SELECT * FROM users WHERE user_mail= :mail", ['mail' => $mail]);
  }

  ////get user based on phone number
  public function getPhoneNumber($number){
    return $this->query_with_params("SELECT * FROM users WHERE phone_number=:number", ['number' => $number]);
  }

  //insert new user into database
  public function insertUser($params){
    return $this->add($params);

  }

  public function deleteUser($id){
    return $this->delete($id, "user_id");
  }


  public function updateUsername($data,$id){
    return $this->update($id, $data, "user_id");

  }



}

 ?>
