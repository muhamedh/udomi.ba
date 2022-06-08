<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/MunicipalitiesDao.class.php';

class MunicipalitiesService extends BaseService{

  public function __construct(){
    parent::__construct(new MunicipalitiesDao());
  }

}

?>