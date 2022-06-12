-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: udomi-db-do-user-11540413-0.b.db.ondigitalocean.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'b063eb99-cf9b-11ec-b0a1-b64d2823617a:1-1188';

--
-- Table structure for table `municipalities`
--

DROP TABLE IF EXISTS `municipalities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipalities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipalities`
--

LOCK TABLES `municipalities` WRITE;
/*!40000 ALTER TABLE `municipalities` DISABLE KEYS */;
INSERT INTO `municipalities` VALUES (1,'Banovići'),(2,'Banja Luka'),(3,'Berkovići'),(4,'Bihać'),(5,'Bijeljina'),(6,'Bileća'),(7,'Bosanska Dubica'),(8,'Bosanska Gradiška'),(9,'Bosanska Kostajnica'),(10,'Bosanska Krupa'),(11,'Bosanski Brod'),(12,'Bosanski Novi'),(13,'Bosanski Petrovac'),(14,'Bosanski Šamac'),(15,'Bosansko Grahovo'),(16,'Bratunac'),(17,'Breza'),(18,'Bugojno'),(19,'Busovača'),(20,'Bužim'),(21,'Cazin'),(22,'Centar'),(23,'Čajniče'),(24,'Čapljina'),(25,'Čelić'),(26,'Čelinac'),(27,'Čitluk'),(28,'Derventa'),(29,'Drvar'),(30,'Doboj'),(31,'Doboj Istok'),(32,'Doboj Jug'),(33,'Dobretići'),(34,'Domaljevac-Šamac'),(35,'Donji Vakuf'),(36,'Donji Žabar'),(37,'Foča'),(38,'Foča-Ustikolina'),(39,'Fojnica'),(40,'Gacko'),(41,'Glamoč'),(42,'Goražde'),(43,'Gračanica'),(44,'Gradačac'),(45,'Grude'),(46,'Hadžići'),(47,'Han-Pijesak'),(48,'Ilidža'),(49,'Ilijaš'),(50,'Istočna Ilidža'),(51,'Istočni Drvar'),(52,'Istočni Mostar'),(53,'Istočni Stari Grad'),(54,'Istočno Novo Sarajevo'),(55,'Jablanica'),(56,'Jajce'),(57,'Jezero'),(58,'Kakanj'),(59,'Kalesija'),(60,'Kalinovik'),(61,'Kiseljak'),(62,'Kladanj'),(63,'Ključ'),(64,'Konjic'),(65,'Kotor-Varoš'),(66,'Kreševo'),(67,'Krupa na Uni'),(68,'Kupres'),(69,'Kupres (RS)'),(70,'Laktaši'),(71,'Livno'),(72,'Lopare'),(73,'Lukavac'),(74,'Ljubinje'),(75,'Ljubuški'),(76,'Maglaj'),(77,'Milići'),(78,'Modriča'),(79,'Mostar'),(80,'Mrkonjić Grad'),(81,'Neum'),(82,'Nevesinje'),(83,'Novi Grad'),(84,'Novi Travnik'),(85,'Novo Goražde'),(86,'Novo Sarajevo'),(87,'Odžak'),(88,'Olovo'),(89,'Orašje'),(90,'Osmaci'),(91,'Oštra Luka'),(92,'Pale'),(93,'Pale-Prača'),(94,'Pelagićevo'),(95,'Petrovac'),(96,'Petrovo'),(97,'Posušje'),(98,'Prijedor'),(99,'Prnjavor'),(100,'Prozor'),(101,'Ravno'),(102,'Ribnik'),(103,'Rogatica'),(104,'Rudo'),(105,'Sanski Most'),(106,'Sapna'),(107,'Skender Vakuf'),(108,'Sokolac'),(109,'Srbac'),(110,'Srebrenica'),(111,'Srebrenik'),(112,'Stari Grad'),(113,'Stanari'),(114,'Stolac'),(115,'Šekovići'),(116,'Šipovo'),(117,'Široki Brijeg'),(118,'Teočak'),(119,'Teslić'),(120,'Tešanj'),(121,'Tomislavgrad'),(122,'Travnik'),(123,'Trebinje'),(124,'Trnovo (FBiH)'),(125,'Trnovo (RS)'),(126,'Tuzla'),(127,'Ugljevik'),(128,'Uskoplje'),(129,'Usora'),(130,'Vareš'),(131,'Velika Kladuša'),(132,'Visoko'),(133,'Višegrad'),(134,'Vitez'),(135,'Vlasenica'),(136,'Vogošća'),(137,'Zavidovići'),(138,'Zenica'),(139,'Zvornik'),(140,'Žepče'),(141,'Živinice'),(1000,'Ostalo');
/*!40000 ALTER TABLE `municipalities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pets` (
  `pets_id` int unsigned NOT NULL AUTO_INCREMENT,
  `petname` varchar(100) DEFAULT NULL,
  `pet_birthdate` date DEFAULT NULL,
  `vaccinated` tinyint DEFAULT NULL,
  `pets_description` varchar(100) DEFAULT NULL,
  `pet_gender` tinyint DEFAULT NULL,
  `adopted` tinyint DEFAULT '0',
  `species_id` int unsigned DEFAULT NULL,
  `owner_id` int unsigned DEFAULT NULL,
  `status` varchar(128) DEFAULT 'ACTIVE',
  PRIMARY KEY (`pets_id`),
  KEY `species_id` (`species_id`),
  KEY `pets_FK` (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES (47,'Candy','2022-06-05',1,':)',1,0,1,20,'ACTIVE'),(48,'Mrak','2017-01-01',0,':o',0,0,1,20,'ACTIVE'),(49,'SneakyKafka','1969-09-06',0,'ninja',0,0,1,22,'ACTIVE'),(50,'ColoCats','1221-12-21',0,'Cat Colony',1,0,1,22,'ACTIVE'),(51,'Hungy','2003-03-03',0,'Ne znam kad je zadnji put jela',1,0,1,22,'ACTIVE'),(52,'SuperTurtle','2009-08-09',1,'Voli da leti',0,0,5,22,'ACTIVE'),(53,'ImagiCat','2002-02-02',0,'Ova je specijalna',1,0,1,22,'ACTIVE'),(54,'Plovka','2022-05-30',1,'Jednostavno neodoljiva, dajemo je za udomljavanje iz prostog razloga računa za vodu.',1,0,1,20,'ACTIVE'),(55,'mrljo','2012-12-12',1,'Malo smotan',0,0,18,22,'ACTIVE'),(56,'Kafopija','2022-06-01',0,'Pit\' će sa vama kafu kad niko drugi neće',1,0,1,20,'ACTIVE'),(57,'Maša','2021-02-16',1,'as derpy as she is cute.',1,0,1,23,'ACTIVE');
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets_photos`
--

DROP TABLE IF EXISTS `pets_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pets_photos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `pet_id` int unsigned DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pets_photos_1_idx` (`pet_id`),
  CONSTRAINT `fk_pets_photos_1` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`pets_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets_photos`
--

LOCK TABLES `pets_photos` WRITE;
/*!40000 ALTER TABLE `pets_photos` DISABLE KEYS */;
INSERT INTO `pets_photos` VALUES (10,47,'https://res.cloudinary.com/udomi-ba/image/upload/v1655020861/cpawurrmcpxvmqavutjd.jpg'),(11,47,'https://res.cloudinary.com/udomi-ba/image/upload/v1655020862/ux913ylzszsofrpsup1o.jpg'),(12,48,'https://res.cloudinary.com/udomi-ba/image/upload/v1655021162/bakfrnzp0mfqjpilrz7y.jpg'),(13,48,'https://res.cloudinary.com/udomi-ba/image/upload/v1655021163/cfuovg8d4lvosh18ruhn.jpg'),(14,49,'https://res.cloudinary.com/udomi-ba/image/upload/v1655023085/igjdq8lyuwkfdonjk5sc.jpg'),(15,50,'https://res.cloudinary.com/udomi-ba/image/upload/v1655023297/mxkw3fitmurpnbkksymh.jpg'),(16,51,'https://res.cloudinary.com/udomi-ba/image/upload/v1655023440/c3zxuyheo0tl5bfxmheq.jpg'),(17,52,'https://res.cloudinary.com/udomi-ba/image/upload/v1655023548/gb0o6aepgjlrkrw38yxs.jpg'),(18,53,'https://res.cloudinary.com/udomi-ba/image/upload/v1655023714/i85bdtspmnpc6l9y4xta.jpg'),(19,54,'https://res.cloudinary.com/udomi-ba/image/upload/v1655024965/v6y1rerbdwm7ue18l4uf.jpg'),(20,55,'https://res.cloudinary.com/udomi-ba/image/upload/v1655025017/fptflzssow5p9oszdxvw.jpg'),(21,56,'https://res.cloudinary.com/udomi-ba/image/upload/v1655056738/gzck1dxjdq4jmsowzfyl.jpg'),(22,56,'https://res.cloudinary.com/udomi-ba/image/upload/v1655056739/i6lmbio7ya3yxytzbycq.jpg'),(23,57,'https://res.cloudinary.com/udomi-ba/image/upload/v1655065635/gahmyk110ohc5v6kiuh7.jpg'),(24,57,'https://res.cloudinary.com/udomi-ba/image/upload/v1655065637/ly94dym5yeptgpzzkm3i.jpg');
/*!40000 ALTER TABLE `pets_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `species`
--

DROP TABLE IF EXISTS `species`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `species` (
  `species_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`species_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `species`
--

LOCK TABLES `species` WRITE;
/*!40000 ALTER TABLE `species` DISABLE KEYS */;
INSERT INTO `species` VALUES (1,'Mačka'),(2,'Pas'),(3,'Ptica'),(4,'Zec'),(5,'Kornjača'),(11,'Hrčak'),(12,'Štakor'),(13,'Zamorac'),(14,'Kameleon'),(15,'Zmija'),(16,'Tarantula'),(17,'Žaba'),(18,'Majmun');
/*!40000 ALTER TABLE `species` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `user_mail` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone_number` varchar(100) DEFAULT NULL,
  `municipality_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `user_mail_UNIQUE` (`user_mail`),
  KEY `fk_users_1_idx` (`municipality_id`),
  CONSTRAINT `fk_users_1` FOREIGN KEY (`municipality_id`) REFERENCES `municipalities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (20,'muhamedhamzic','muhamed.hamzic@stu.ibu.edu.ba','0','062111222',83),(22,'dzlmao','dzlmao@gmail.com','0','dzlmao',39),(23,'amiraaa','amira.abdo23@hotmail.com','0','123456',46);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-12 22:35:20
