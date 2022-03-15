<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once dirname(__FILE__)."/../config.php";


class BaseDao{

  protected $conn;

  public function __construct(){

    try {
      $this->conn = new PDO("mysql:host=".Config::DB_HOST.";dbname=".Config::DB_SCHEME, Config::DB_USERNAME, Config::DB_PASSWORD);
      $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
      throw $e;
    }
    }
  /*
  * Performs a query which does not have any parameters
  */
  public function query_no_params($query){
    $stmt = $this->conn->query($query);
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $res;
  }

  public function query_with_params($query, $params){
    $stmt = $this->conn->prepare($query);
    $stmt->execute($params);
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $res;
  }

  public function insert($query, $params){
    $stmt = $this->conn->prepare($query);
    $stmt -> execute($params);
  }
}

?>
