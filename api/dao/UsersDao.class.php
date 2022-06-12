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
    return $this->query_unique("SELECT username, user_mail, phone_number, municipality_id FROM users WHERE username=:username", ['username' => $username]);
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

  public function get_restricted_user($user_id){
    return $this->query_with_params("SELECT u.username, u.user_mail, u.phone_number, m.id AS 'municipality_id', m.name 
                                     FROM users u
                                     JOIN municipalities m ON u.municipality_id = m.id
                                     WHERE u.user_id = :user_id", ['user_id' => $user_id]);
  }

  public function get_all_restricted_users(){
    return $this->query_no_params("SELECT username, user_mail, phone_number, municipality_id FROM users");
  }

  public function getMailAndPhone($user_id){
    return $this->query_with_params("SELECT user_mail, phone_number FROM users WHERE user_id = :user_id", ['user_id' => $user_id]);
  }

  }

 ?>
