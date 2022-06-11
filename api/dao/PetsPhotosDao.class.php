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
    $query = "INSERT INTO pets_photos (pet_id, url) VALUES";
    for($i = 0;$i < count($photos);$i++){
      $query .= "(".$pets_id.", \"".$photos[$i]."\"),";
    }
    $query = substr($query, 0, -1);
    $query .= ";";
    $this->query_no_params($query);
    
  }

}
