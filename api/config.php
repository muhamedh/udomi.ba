<?php

class Config{

  public static function DB_HOST(){
    return Config::get_env("DB_HOST", "localhost");
  }
  public static function DB_USERNAME(){
    return Config::get_env("DB_USERNAME", "root");
  }
  public static function DB_PASSWORD(){
    return Config::get_env("DB_PASSWORD", "root123");
  }
  public static function DB_SCHEME(){
    return Config::get_env("DB_SCHEME", "udomidb");
  }
  public static function DB_PORT(){
    return Config::get_env("DB_PORT", "3307");
  }
  public static function JWT_SECRET(){
    return COnfig::get_env("JWT_SECRET", "bcckLFNegZxUgKFZcceg");
  }
  public static function get_env($name, $default){
    return isset($_ENV[$name]) && trim($_ENV[$name]) != '' ? $_ENV[$name] : $default;
   }
  
}

?>
