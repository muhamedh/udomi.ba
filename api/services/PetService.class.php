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

  public function get_all_filtered($search){
    return $this->dao->get_all_filtered($search);
  }
  
  public function pet_pets_photos_add($data){

     $photos = $data['photos'];
     unset($data['photos']);
     if(array_key_exists('id',$data)){
      $data['owner_id'] = $data['id'];
      unset($data['id']);
     }

     $catch = ($this->dao->add($data));
    
     Flight::petsPhotosService()->add_photos($photos, $catch['id']);
     
     return Flight::json($catch);
  }

  public function get_pet_by_id($pets_id){
    return $this->dao->get_pet_by_id($pets_id);
  }

  public function update($id, $data, $pk_name){
    $catch = $this->dao->update($id, $data, $pk_name);
    if($catch['message'] == 'updated'){
          return ['message' => 'error'];
    }else{
      return ['message' => 'error'];
    }
  }
  
  public function update_del($id, $data, $pk_name){
    $catch = $this->dao->update($id, $data, $pk_name);
    if($catch['message'] == 'updated'){
        $catch = Flight::petsPhotosService()->delete_photos_by_pets_id($id);
        if(!key_exists('message', $catch)){
          return ['message' => 'error'];
        }else{
          return ['message' => 'ok'];
        }
    }else{
      return ['message' => 'error'];
    }
  }

}

?>