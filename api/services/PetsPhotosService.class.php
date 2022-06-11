<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/PetsPhotosDao.class.php';

class PetsPhotosService extends BaseService{

  public function __construct(){
    parent::__construct(new PetsPhotosDao());
  }

  public function add_photos($photos, $pets_id){
    
    return $this->dao->add_photo_batch($photos,$pets_id);
  }
}

?>