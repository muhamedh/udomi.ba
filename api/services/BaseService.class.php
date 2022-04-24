<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__.'/../dao/BaseDao.class.php';

abstract class BaseService {

  protected $dao;

  public function __construct($dao){
    $this->dao = $dao;
  }

  public function get_all(){
    return $this->dao->get_all();
  }

  public function get_by_id($id, $pk_name){
    return $this->dao->get_by_id($id, $pk_name);
  }

  public function add($entity){
    return $this->dao->add($entity);
  }

  public function update($id, $entity){
    return $this->dao->update($id, $entity);
  }

  public function delete($id){
    return $this->dao->delete($id);
  }
}
?>