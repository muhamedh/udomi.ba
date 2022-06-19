<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/PetsPhotosDao.class.php';

use Cloudinary\Cloudinary;

class PetsPhotosService extends BaseService{

  public function __construct(){
    parent::__construct(new PetsPhotosDao());
  }

  public function add_photos($photos, $pets_id){
    return $this->dao->add_photo_batch($photos,$pets_id);
  }

  public function delete_photos_by_pets_id($pets_id){
      
      $cloud_name = getenv('CLOUD_NAME');
      $api_key = getenv('API_KEY');
      $api_secret = getenv('API_SECRET');
      
      $cloudinary = new Cloudinary([
      'cloud' => [
          'cloud_name' => $cloud_name,
          'api_key'    => $api_key,
          'api_secret' => $api_secret,
      ],
      ]);
      $photos = $this->dao->get_public_id_by_pets_id($pets_id);

      print_r($photos);


      for($i = 0;$i < count($photos);$i++){
        $cloudinary->uploadApi()->destroy($photos[$i]['public_id'], $options=[]);
      }

      $this->dao->delete_entries_by_pets_id($pets_id);

      return ['message' => 'ok'];
  }
}

?>