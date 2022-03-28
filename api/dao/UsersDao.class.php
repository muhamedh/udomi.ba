<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__)."/BaseDao.class.php";

class UsersDao extends BaseDao{

  //get all users
  public function getAllUsers(){
    return $this->query_no_params("SELECT * FROM users");
  }

  //get user based on id
  public function getUserById($user_id){
    return $this->query_with_params("SELECT * FROM users WHERE user_id=:id", ['id' => $user_id]);
  }

  //get user based on username
  public function getUsername($username){
    return $this->query_with_params("SELECT * FROM users WHERE username= :username", ['username' => $username]);
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
    $query = "INSERT INTO users (username, user_mail, password, phone_number) VALUES (:username, :user_mail, :password, :phone_number)";
    $res = $this->conn->prepare($query);
    $res->execute($params);
    $params['user_id'] = $this->conn->lastInsertId();
    return $params;

  }

}

 ?>
