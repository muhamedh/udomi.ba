<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once dirname(__FILE__)."/../config.php";


class BaseDao{
  function __constructor(){

    try {
      $conn = new PDO("mysql:host=.Config::DB_HOST.;dbname=Config::DB_SCHEME", Config::DB_USERNAME, Config::DB_PASSWORD);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      echo "Connected successfully";
    } catch(PDOException $e) {
      echo "Error";
      throw $e;
    }
    }

}

?>
