<?php

require_once dirname(__FILE__)."/BaseDao.class.php";

class PetsDao extends BaseDao{
  /*
  * Returns all pets
  */
  public function get_all_pets(){
    return $this->query_no_params("SELECT * FROM pets");
  }
  /*
  * Returns the pet with the queried id
  */
  public function get_pet_by_id($pet_id){
    return $this->query_with_params("SELECT * FROM pets WHERE pet_id = :id",[ 'id' => $pet_id ]);
  }
  /*
  * Returns all pets which are vaccinated, by calling on query_with_params from BaseDao
  */
  public function get_pets_by_vaccine($vaccinated){
    return $this->query_with_params("SELECT * FROM pets WHERE vaccinated = :vaccinated", [ 'vaccinated' => $vaccinated]);
  }

  public function get_pets_by_age($timestamp){
    /*
    * To be implemented
    */
  }

}

?>
