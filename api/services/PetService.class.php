<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/PetsDao.class.php';

use Cloudinary\Cloudinary;

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
      print_r("let us delete photos");
      /*
        $cloud_name = getenv('CLOUD_NAME');
        $api_key = getenv('API_KEY');
        $api_secret = getenv('API_SECRET');
      */
    $cloud_name = "udomi-ba";
    $api_key = "917991252989184";
    $api_secret = "uAYOIb3UV2-MJiR4v5tFzUESb8I";

    $cloudinary = new Cloudinary([
    'cloud' => [
        'cloud_name' => $cloud_name,
        'api_key'    => $api_key,
        'api_secret' => $api_secret,
    ],
    ]);

    $catch_me = $cloudinary->uploadApi()->destroy("xhyxxljq3t1vzphvbcdn", $options=[]);
    print_r($catch_me);

      die;
    }else{
      //TODO throw exception
    }
  }

}

?>