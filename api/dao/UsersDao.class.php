<?php

require_once dirname(__FILE__)."/BaseDao.class";

class Users extends BaseDao{

  public function getAllUsers(){
    return $this->query_no_params("SELECT * FROM users");
  }

  public function getUserById($user_id){
    return $this->query_with_params("SELECT * FROM users WHERE user_id=:id", [id=> $user_id]);
  }
  /*
  get by username
  get by mail
  get by phone number

  insert users
  */
  public function getUsername($username){
    return $this->query_with_params("SELECT * FROM users WHERE username=:username", ['username' => $username]);
  }

  public function getMail($mail){
    return $this->query_with_params("SELECT * FROM users WHERE user_mail=:mail", ['mail'] => $mail);
  }

  public function getPhoneNumber($number){
    return $this->query_with_params("SELECT * FROM users WHERE phone_number=:number", ['number'] => $number);
  }

  public function insertUser($params){
    $query = "INSERT INTO users (username, user_mail, password, phone_number) VALUES (:username, :mail, :password, :phone_number)";
    $this->insert($query, $params);
  }

}

 ?>
