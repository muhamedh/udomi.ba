<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once dirname(__FILE__) . "/../config.php";

class BaseDao
{
  /**
   * EW
   */
  protected $conn;
  protected $table_name;

  public function __construct($table_name)
  {
    $servername = Config::DB_HOST();
    $username = Config::DB_USERNAME();
    $password = Config::DB_PASSWORD();
    $schema = Config::DB_SCHEME();
    $port = Config::DB_PORT();
    $this->conn = new PDO("mysql:host=$servername;dbname=$schema;port=$port", $username, $password);
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $this->table_name = $table_name;
  }

  /*
  * Performs a query which does not have any parameters
  */
  public function query_no_params($query)
  {
    $stmt = $this->conn->query($query);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  /**
   * Perform query with parameters
   */
  
  public function query_with_params($query, $params)
  {
    $stmt = $this->conn->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  /**
   * Return only one row of result
   */
  protected function query_unique($query, $params)
  {
    $stmt = $this->query_with_params($query, $params);
    return reset($stmt);
  }
  /**
   * Method used to read all objects from database
   */
  public function get_all()
  {
    $stmt = $this->conn->prepare("SELECT * FROM " . $this->table_name);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  /**
   * Return the data by the pk id
   */
  public function get_by_id($id, $pk_name)
  {
    $stmt = $this->conn->prepare("SELECT * FROM " . $this->table_name . " WHERE " . $pk_name . " = :id");
    $stmt->execute(['id' => $id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return reset($result);
  }
  /**
   * Delete record from the database
   */
  public function delete($id, $pk_name)
  {
    $stmt = $this->conn->prepare("DELETE FROM " . $this->table_name . " WHERE " . $pk_name . "=:id");
    $stmt->bindParam(':id', $id); // SQL injection prevention
    $stmt->execute();
  }
  /**
   * Add record to the database
   */
  public function add($entity)
  {
    $query = "INSERT INTO " . $this->table_name . " (";
    foreach ($entity as $column => $value) {
      $query .= $column . ", ";
    }
    $query = substr($query, 0, -2);
    $query .= ") VALUES (";
    foreach ($entity as $column => $value) {
      $query .= ":" . $column . ", ";
    }
    $query = substr($query, 0, -2);
    $query .= ")";

    $stmt = $this->conn->prepare($query);
    $stmt->execute($entity); // sql injection prevention
    $entity['id'] = $this->conn->lastInsertId();
    return $entity;
  }
  /**
   * Update record from the database
   */
  public function update($id, $entity, $id_column = "id")
  {
    $query = "UPDATE " . $this->table_name . " SET ";
    foreach ($entity as $name => $value) {
      $query .= $name . "= :" . $name . ", ";
    }
    $query = substr($query, 0, -2);
    $query .= " WHERE ${id_column} = :id";

    $stmt = $this->conn->prepare($query);
    $entity['id'] = $id;
    $stmt->execute($entity);
  }
}
