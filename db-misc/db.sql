-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema udomidb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema udomidb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `udomidb` DEFAULT CHARACTER SET latin1 ;
USE `udomidb` ;

-- -----------------------------------------------------
-- Table `udomidb`.`species`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `udomidb`.`species` ;

CREATE TABLE IF NOT EXISTS `udomidb`.`species` (
  `species_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NULL DEFAULT NULL,
  PRIMARY KEY (`species_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `udomidb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `udomidb`.`users` ;

CREATE TABLE IF NOT EXISTS `udomidb`.`users` (
  `user_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(256) NULL DEFAULT NULL,
  `user_mail` VARCHAR(256) NULL DEFAULT NULL,
  `password` VARCHAR(256) NULL DEFAULT NULL,
  `phone_number` VARCHAR(256) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `udomidb`.`pets`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `udomidb`.`pets` ;

CREATE TABLE IF NOT EXISTS `udomidb`.`pets` (
  `pets_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `petname` VARCHAR(256) NULL DEFAULT NULL,
  `pet_birthdate` DATE NULL DEFAULT NULL,
  `vaccinated` TINYINT(4) NULL DEFAULT NULL,
  `owner_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `species_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `photos_url` VARCHAR(256) NULL DEFAULT NULL,
  `pets_description` VARCHAR(512) NULL DEFAULT NULL,
  `pet_gender` TINYINT(4) NULL DEFAULT NULL,
  `adopted` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`pets_id`),
  INDEX `fk_pets_species` (`species_id` ASC) VISIBLE,
  INDEX `fk_pets_users` (`owner_id` ASC) VISIBLE,
  CONSTRAINT `fk_pets_species`
    FOREIGN KEY (`species_id`)
    REFERENCES `udomidb`.`species` (`species_id`),
  CONSTRAINT `fk_pets_users`
    FOREIGN KEY (`owner_id`)
    REFERENCES `udomidb`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
