<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__)."/BaseDao.class.php";

class PetsPhotosDao extends BaseDao{

  public function __construct(){
    parent::__construct("pets_photos");
  }

  public function add_photo_batch($photos, $pets_id){


    $query = "INSERT INTO pets_photos (`pet_id`, `url`, `public_id`) VALUES";
    for($i = 0;$i < count($photos);$i++){
      $query .= "(".$pets_id.", '".$photos[$i]['url']."', '".$photos[$i]['public_id']."'),";
    }
    $query = substr($query, 0, -1);
    $query .= ";";

    $this->query_no_params($query);
    
  }

  public function get_public_id_by_pets_id($pets_id){
    return $this->query_with_params("SELECT public_id FROM pets_photos WHERE pet_id =:pets_id",['pets_id'=>$pets_id]);
  }

  public function delete_entries_by_pets_id($pets_id){
    return $this->query_with_params("DELETE FROM pets_photos WHERE pet_id=:pets_id",['pets_id'=>$pets_id]);
  }

}
