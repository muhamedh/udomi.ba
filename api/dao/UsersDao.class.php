<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__)."/BaseDao.class.php";

class UsersDao extends BaseDao{

  public function __construct(){
    parent::__construct("users");
  }
  /**
   * Get user based on username
   * TODO:
   *      might use query unique
   */
  public function getUsername($username){
    return $this->query_unique("SELECT * FROM users WHERE username=:username", ['username' => $username]);
  }
  /**
   * Get user based on email
   */
  public function getMail($mail){
    return $this->query_unique("SELECT * FROM users WHERE user_mail= :mail", ['mail' => $mail]);
  }
  /**
   * Get user based on phone number
   */
  public function getPhoneNumber($number){
    return $this->query_with_params("SELECT * FROM users WHERE phone_number=:number", ['number' => $number]);
  }
  }

 ?>
