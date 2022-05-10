<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__)."/BaseDao.class.php";

class SpeciesDao extends BaseDao{

  public function __construct(){
    parent::__construct("species");
  }
  /*
  * Return the name of a species with a provided pets_id from pets table
  */
  function get_species_by_pets_id($pets_id){
    $sql = "SELECT s.name FROM pets AS p
            JOIN species AS s ON p.species_id = s.species_id
            WHERE p.pets_id = :pets_id";
    return $this->query_with_params($sql, ['pets_id' => $pets_id]);
  }
  /*
  * When we later on use this function to actually insert it, we need to make sure that the parameter $species_name is of type array() so array($species_name)
  */
  function insert_species($species_name){
   return $this->add($species_name);
  }
}
