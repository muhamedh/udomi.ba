<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__)."/BaseDao.class.php";

class MunicipalitiesDao extends BaseDao{

  public function __construct(){
    parent::__construct("municipalities");
  }

}
