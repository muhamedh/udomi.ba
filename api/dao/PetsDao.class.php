<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__)."/BaseDao.class.php";

class PetsDao extends BaseDao{

  public function __construct(){
    parent::__construct("pets");
  }
  
  /*
  * Returns all pets which are vaccinated, by calling on query_with_params from BaseDao
  */
  public function get_pets_by_vaccine($vaccinated){
    return $this->query_with_params("SELECT * FROM pets WHERE vaccinated = :vaccinated", [ 'vaccinated' => $vaccinated]);
  }
  /**
   * Get pets older
   */
  
  public function get_older_pets($timestamp){
    return $this->query_with_params("SELECT * FROM pets WHERE pet_birthdate < :timestamp", ['timestamp' => $timestamp]);
  }

  /**
   * Get younger pets
   */
  public function get_younger_pets($timestamp){
    return $this->query_with_params("SELECT * FROM pets WHERE pet_birthdate > :timestamp", ['timestamp' => $timestamp]);
   }

  /**
   * Get by gender
   */
  public function get_by_gender($gender){
    return $this->query_with_params("SELECT * FROM pets WHERE pet_gender = :gender", ['gender' => $gender]);
  }

  /**
   * Get pet by owner id
   * query works
   */
  public function get_by_owner($owner_id){
    return $this->query_with_params("SELECT * FROM pets WHERE owner_id = :owner_id AND status = 'ACTIVE'", ['owner_id' => $owner_id]);
  }

  public function get_all(){
    return $this->query_no_params("SELECT * FROM pets WHERE status = 'ACTIVE'");
  }
}
