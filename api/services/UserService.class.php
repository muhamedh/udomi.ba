<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/UsersDao.class.php';

class UserService extends BaseService{

  public function __construct(){
    parent::__construct(new UsersDao());
  }

  public function getUsername($username){
    return $this->dao->getUsername($username);
  }

  public function getMail($mail){
    return $this->dao->getMail($mail);
  }

  public function get_restricted_user($user_id){
    return $this->dao->get_restricted_user($user_id);
  }

  public function get_all_restricted_users(){
    return $this->dao->get_all_restricted_users();
  }
}
?>