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
  * Returns all pets
  */
  public function get_all_pets(){
    return $this->get_all();
    //return parent::get_all();
    
  }
  /*
  * Returns the pet with the queried id
  */
  public function get_pet_by_id($pet_id){
    return $this->get_by_id($pet_id, "pets_id");
  }
  /*
  * Returns all pets which are vaccinated, by calling on query_with_params from BaseDao
  */
  public function get_pets_by_vaccine($vaccinated){
    return $this->query_with_params("SELECT * FROM pets WHERE vaccinated = :vaccinated", [ 'vaccinated' => $vaccinated]);
  }

  //get pets older
  public function get_older_pets($timestamp){
    return $this->query_with_params("SELECT * FROM pets WHERE pet_birthdate < :timestamp", ['timestamp' => $timestamp]);
  }

  //get pets younger
  public function get_younger_pets($timestamp){
    return $this->query_with_params("SELECT * FROM pets WHERE pet_birthdate > :timestamp", ['timestamp' => $timestamp]);
   }

  // get by gender
  public function get_by_gender($gender){
    return $this->query_with_params("SELECT * FROM pets WHERE pet_gender = :gender", ['gender' => $gender]);
  }

}
?>
