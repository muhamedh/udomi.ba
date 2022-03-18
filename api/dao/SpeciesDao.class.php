<?php
/*
* Author : Muhamed Hamzic
*/

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__)."/BaseDao.class.php";

class SpeciesDao extends BaseDao{
  /*
  * Returns all pets
  */
  function get_all_species(){
    return $this->query_no_params("SELECT * FROM species");
  }
  /*
  * Get species by id
  */
  function get_species_by_id($id){
    return $this->query_with_params("SELECT * FROM species WHERE species_id = :id", [ 'id' => $id ]);
  }

}

?>
