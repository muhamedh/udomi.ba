<?php

require_once dirname(__FILE__)."/BaseDao.class.php";

class PetsDao extends BaseDao{

  public function get_all_pets(){
    return $this->query_no_params("SELECT * FROM pets");
  }

  public function get_pet_by_id($pet_id){
    return $this->query_with_params("SELECT * FROM pets WHERE pet_id = :id",[ 'id' => $pet_id ]);
  }

}

?>
