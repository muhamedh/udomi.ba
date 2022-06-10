<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/PetsDao.class.php';

class PetService extends BaseService{

  public function __construct(){
    parent::__construct(new PetsDao());
  }

  public function get_pets_by_vaccine($vaccinated){
    return $this->dao->get_pets_by_vaccine($vaccinated);
  }

  public function get_by_gender($gender){
    return $this->dao->get_by_gender($gender);
  }

  public function get_older_pets($timestamp){
    return $this->dao->get_older_pets($timestamp);
  }

  public function get_younger_pets($timestamp){
    return $this->dao->get_younger_pets($timestamp);
  }

  public function get_by_owner($owner_id){
    return $this->dao->get_by_owner($owner_id);
  }

  public function get_all_filtered($search)
  {

    return $this->dao->get_all_filtered($search);
  }
  
}

?>