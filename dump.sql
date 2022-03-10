-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: icolabora_teste_ii
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campos`
--

DROP TABLE IF EXISTS `campos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campos` (
  `posicao` int NOT NULL AUTO_INCREMENT,
  `idHTML` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `label` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tipoCampo` enum('simples','grande','combo') COLLATE utf8mb4_general_ci DEFAULT 'simples',
  `opcao1` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `opcao2` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `opcao3` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  UNIQUE KEY `posicao` (`posicao`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campos`
--

LOCK TABLES `campos` WRITE;
/*!40000 ALTER TABLE `campos` DISABLE KEYS */;
INSERT INTO `campos` VALUES (1,'nome','Insira seu nome:','simples',NULL,NULL,NULL),(2,'idade','Insira sua idade','simples',NULL,NULL,NULL),(3,'altura','Insira sua altura','simples',NULL,NULL,NULL),(4,'sobre','Fale sobre você','grande',NULL,NULL,NULL),(5,'sexo','Escolha seu sexo','combo','Masculino','Feminino','Outro');
/*!40000 ALTER TABLE `campos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envios`
--

DROP TABLE IF EXISTS `envios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idCampo1` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `resposta1` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idCampo2` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `resposta2` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idCampo3` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `resposta3` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idCampo4` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `resposta4` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idCampo5` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `resposta5` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envios`
--

LOCK TABLES `envios` WRITE;
/*!40000 ALTER TABLE `envios` DISABLE KEYS */;
INSERT INTO `envios` VALUES (3,'nome','Luiz Henrique Saydt','idade','22','altura','1,77','sobre','blablablablablablablablablablablablablablablablablablablablablablablabla','sexo','Masculino');
/*!40000 ALTER TABLE `envios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-10 17:29:59
