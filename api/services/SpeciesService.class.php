<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/SpeciesDao.class.php';

class SpeciesService extends BaseService{
    
    public function __construct(){
        parent::__construct(new SpeciesDao());
    }
    
    public function get_species_by_pets_id($pets_id){
        return $this->dao->get_species_by_pets_id($pets_id);
    }
}

?>