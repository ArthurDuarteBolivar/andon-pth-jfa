-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: andon
-- ------------------------------------------------------
-- Server version	8.0.34

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

--
-- Table structure for table `thdados`
--

DROP TABLE IF EXISTS `thdados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thdados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nameId` int DEFAULT NULL,
  `count` int DEFAULT NULL,
  `time` int DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `currentTC` int DEFAULT NULL,
  `maintenance` int DEFAULT NULL,
  `shortestTC` int DEFAULT NULL,
  `firstLastTC` int DEFAULT NULL,
  `secondtLastTC` int DEFAULT NULL,
  `thirdLastTC` int DEFAULT NULL,
  `firtlasttc` int DEFAULT NULL,
  `QtdeTCexcedido` int DEFAULT NULL,
  `TCmedio` int DEFAULT NULL,
  `localTC` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nameId` (`nameId`),
  CONSTRAINT `thdados_ibfk_1` FOREIGN KEY (`nameId`) REFERENCES `operaion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thdados`
--

LOCK TABLES `thdados` WRITE;
/*!40000 ALTER TABLE `thdados` DISABLE KEYS */;
INSERT INTO `thdados` VALUES (52,1,136,0,'azul','2023-07-24 16:10:01',76,0,46,NULL,73,77,75,32,75,0),(54,2,0,0,'verde','2023-07-24 21:07:37',0,0,9999,NULL,0,0,0,0,0,0),(55,3,170,0,'vermelho','2023-07-24 21:41:41',0,0,78,NULL,0,0,0,0,0,0),(56,4,0,0,'verde','2023-07-24 21:41:50',0,0,9999,NULL,0,0,0,0,0,0),(57,5,180,0,'verde','2023-07-24 21:42:10',12,0,11,NULL,0,11,4,5,8,0),(58,6,0,0,'verde','2023-07-24 21:42:24',0,0,9999,NULL,0,0,0,0,0,0),(59,7,156,0,'verde','2023-07-25 14:14:01',0,0,27,NULL,0,0,0,3,0,0),(60,8,61,0,'vermelho','2023-07-25 14:14:49',0,5,9999,NULL,1,0,0,0,0,0),(61,9,65,0,'vermelho','2023-07-25 14:14:51',0,2,9999,NULL,0,0,0,0,0,0),(62,10,60,0,'vermelho','2023-07-25 14:14:52',0,1,9999,NULL,0,3,0,0,0,0),(63,11,99,0,'vermelho','2023-07-25 14:14:54',0,0,11,NULL,1,0,172,5,43,0),(64,12,0,0,'verde','2023-07-25 14:14:55',0,0,9999,NULL,0,0,0,0,0,0),(65,13,0,0,'verde','2023-07-25 14:15:19',0,0,9999,NULL,0,0,0,0,0,0),(66,14,0,0,'verde','2023-07-25 14:15:40',0,0,9999,NULL,0,0,0,0,0,0),(67,15,150,0,'vermelho','2023-07-25 14:16:45',0,0,26,NULL,0,0,0,10,0,0),(68,16,158,0,'verde','2023-07-25 14:17:07',53,0,11,NULL,42,37,48,1,49,0);
/*!40000 ALTER TABLE `thdados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-26 10:30:05
