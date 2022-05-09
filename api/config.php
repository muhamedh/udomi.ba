<?php

class Config{

  public static function DB_HOST(){
    return Config::get_env("DB_HOST", "sql11.freemysqlhosting.net");
  }
  public static function DB_USERNAME(){
    return Config::get_env("DB_USERNAME", "sql11479683");
  }
  public static function DB_PASSWORD(){
    return Config::get_env("DB_PASSWORD", "SYjx6V3AZc");
  }
  public static function DB_SCHEME(){
    return Config::get_env("DB_SCHEME", "sql11479683");
  }
  public static function DB_PORT(){
    return Config::get_env("DB_PORT", "3306");
  }

  public static function get_env($name, $default){
    return isset($_ENV[$name]) && trim($_ENV[$name]) != '' ? $_ENV[$name] : $default;
   }

  /*const DB_HOST = "sql11.freemysqlhosting.net";
  const DB_USERNAME = "sql11479683";
  const DB_PASSWORD = "SYjx6V3AZc";
  const DB_SCHEME = "sql11479683";*/

}

?>
