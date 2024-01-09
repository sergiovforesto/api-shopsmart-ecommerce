CREATE DATABASE  IF NOT EXISTS `shopsmartdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shopsmartdb`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shopsmartdb
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `collections`
--

DROP TABLE IF EXISTS `collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collections`
--

LOCK TABLES `collections` WRITE;
/*!40000 ALTER TABLE `collections` DISABLE KEYS */;
INSERT INTO `collections` VALUES (1,'Apple','Apple'),(2,'Samsung','Samsung'),(3,'Xiaomi','Xiaomi'),(4,'Laptops','Laptops'),(5,'Gaming','Gaming');
/*!40000 ALTER TABLE `collections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderNumber` varchar(255) NOT NULL,
  `dateOrder` varchar(255) NOT NULL,
  `dateDelivery` varchar(255) DEFAULT NULL,
  `products` json NOT NULL,
  `status` enum('pending','shipped','delivered','cancelled') DEFAULT 'pending',
  `subTotal` decimal(10,0) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (6,'32623274-8850-444a-8a1c-ea0215eaae19','2024-01-02','2025-02-10','[{\"name\": \"Xbox Series X\", \"color\": \"black\", \"image\": \"2eece821-64f5-4c55-a973-599d59547da1.webp\", \"price\": \"599.99\", \"total\": \"$575.99\", \"discount\": 4, \"quantity\": 1, \"subTotal\": \"$599.99\", \"userName\": \"sergio ventura\", \"productId\": 3}]','delivered',600,576,'2024-01-02 12:25:50','2024-01-03 13:09:37',1),(7,'9284c022-aae5-4f5d-8632-4914bd23fbe0','2024-01-02','2024-01-26','[{\"name\": \"Honor Magic\", \"color\": \"green\", \"image\": \"888819c1-d683-4842-9022-0a990dc271e8.webp\", \"price\": \"250\", \"total\": \"$237.50\", \"discount\": 5, \"quantity\": 1, \"subTotal\": \"$250.00\", \"userName\": \"sergio ventura\", \"productId\": 9}]','cancelled',250,238,'2024-01-02 12:28:55','2024-01-03 13:20:58',1),(8,'e3f3158b-7f59-4d2e-b392-b9001b28a7be','2024-01-02','2024-01-25','[{\"name\": \"Samsung Galaxy S22 Ultra\", \"color\": \"black\", \"image\": \"9e6156ad-f95c-4492-b38e-69714fd6d693.webp\", \"price\": \"850\", \"total\": \"$807.50\", \"discount\": 5, \"quantity\": 1, \"subTotal\": \"$850.00\", \"userName\": \"pedro garcia\", \"productId\": 7}]','shipped',850,808,'2024-01-02 13:55:03','2024-01-03 13:22:25',2),(9,'5fd47fd1-35cf-49cd-97ea-ce64a63c725c','2024-01-02','2028-10-03','[{\"name\": \"PlayStation 5\", \"color\": \"white\", \"image\": \"8e2afef2-b8a8-47f5-8220-7cb447627dd5.webp\", \"price\": \"599.99\", \"total\": \"$1,163.98\", \"discount\": 3, \"quantity\": 2, \"subTotal\": \"$1,199.98\", \"userName\": \"pedro garcia\", \"productId\": 2}]','pending',1200,1164,'2024-01-02 13:55:34','2024-01-03 13:22:50',2),(10,'c2aaaa2a-9018-4c67-bb48-534df437d568','2024-01-04','Pending to be assigned','[{\"name\": \"ASUS-ROG-Strix-G15-(2022)\", \"color\": \"black\", \"image\": \"65747536-b3c7-4648-b316-d47b31edc2d6.jpg\", \"price\": \"1239\", \"total\": \"$1,239.00\", \"discount\": 0, \"quantity\": 1, \"subTotal\": \"$1,239.00\", \"userName\": \"sergio ventura\", \"productId\": 11}]','pending',1239,1239,'2024-01-04 07:40:03','2024-01-04 07:40:03',1),(11,'e17dd699-152a-4009-a779-fbfc686a87cd','2024-01-06','Pending to be assigned','[{\"name\": \"Iphone 14 pro max\", \"color\": \"black\", \"image\": \"e2c62777-93cb-4926-b82b-f93dff912d54.webp\", \"price\": \"1258\", \"total\": \"$1,132.20\", \"discount\": 10, \"quantity\": 1, \"subTotal\": \"$1,258.00\", \"userName\": \"mikey shinoba\", \"productId\": 6}, {\"name\": \"Dell-Inspiron-15\", \"color\": \"black\", \"image\": \"e475065d-e151-4462-b53d-d02a98bf7a9b.jpg\", \"price\": \"869\", \"total\": \"$738.65\", \"discount\": 15, \"quantity\": 1, \"subTotal\": \"$869.00\", \"userName\": \"mikey shinoba\", \"productId\": 12}, {\"name\": \"Control Xbox Series X\", \"color\": \"green\", \"image\": \"9f5c5b47-3dd6-472e-a06e-621ae343f614.webp\", \"price\": \"120\", \"total\": \"$1,188.00\", \"discount\": 1, \"quantity\": 10, \"subTotal\": \"$1,200.00\", \"userName\": \"mikey shinoba\", \"productId\": 5}]','pending',3327,3059,'2024-01-06 09:37:44','2024-01-06 09:37:44',3),(12,'f005ab86-2539-4bd4-b1bd-faf6863e6e2e','2024-01-06','Pending to be assigned','[{\"name\": \"PlayStation 5 God of War\", \"color\": \"white\", \"image\": \"c44e3f84-4761-4be3-b6c6-6dfa56a752f4.webp\", \"price\": \"680\", \"total\": \"$680.00\", \"discount\": 0, \"quantity\": 1, \"subTotal\": \"$680.00\", \"userName\": \"mikey shinoba\", \"productId\": 4}]','pending',680,680,'2024-01-06 11:44:09','2024-01-06 11:44:09',3);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `exp` varchar(255) NOT NULL,
  `cvv` int NOT NULL,
  `cardNumber` varchar(255) NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,'sergio ventura','2026-12-31',878,'$2b$10$GLnZDhl04kkMHb/BXczb7O.kjSgU8YlW5sfjaXEGCelUMxmZyd2Ym',1),(2,'pedro garcia','2025-10-22',799,'$2b$10$xr.lcUKaxt/4DsWE0A/hkeZor/YF31q2KLeBIvUX0FsLfIqTznMk2',2),(3,'mikey shinoba','2025-03-05',799,'$2b$10$2ryL9m9aDpCxbGuBz7Vk0.sLeZfu60RE.VD6mpUpx/.RTrjjvLsWm',3);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_features`
--

DROP TABLE IF EXISTS `product_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first` varchar(255) DEFAULT NULL,
  `firstValue` varchar(255) DEFAULT NULL,
  `second` varchar(255) DEFAULT NULL,
  `secondValue` varchar(255) DEFAULT NULL,
  `third` varchar(255) DEFAULT NULL,
  `thirdValue` varchar(255) DEFAULT NULL,
  `fourth` varchar(255) DEFAULT NULL,
  `fourthValue` varchar(255) DEFAULT NULL,
  `fifth` varchar(255) DEFAULT NULL,
  `fifthValue` varchar(255) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_features_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_features`
--

LOCK TABLES `product_features` WRITE;
/*!40000 ALTER TABLE `product_features` DISABLE KEYS */;
INSERT INTO `product_features` VALUES (1,'Memory','512GB','Unlocked','Yes','OS','iOS','Wifi','yes','SIM','nano-sim',1),(2,'CPU','AMD Ryzen-8 cores/16 threads','GPU','AMD Radeon ™ RDNA 2','Memory','GDDR6 16GB','SSD','825GB','Video output','TVs 4K 120H, Tvs 8Kç, VRR',2),(3,'CPU','CPU. 8X Cores @ 3.8 GHz','STORAGE','16GB GDDR6','VIDEO CAPABILITIES','4K','PORTS','HDMI. 1x HDMI 2.1 port','External storage','USB 3.2 external',3),(4,'CPU ','AMD Ryzen-8 cores/16 threads','GPU','AMD Radeon ™ RDNA 2','Memory','GDDR6 16GB','SDD','825GB','Video output','TVs 4K 120H, Tvs 8Kç, VRR',4),(5,'Connectivity','Wireless','Dimensions','6.02 in × 4.01','Generation','Eighth and ninth','Release date','EU: November 22, 2013','Developer','Microsoft Gaming',5),(6,'Memory','512GB','Unlocked','Yes','OS','iOS','Wifi','yes','SIM','nano-sim',6),(7,'OS','Android 12, upgradable to Android 14','MEMORY','128GB','RAM','8GB RAM','Sensors','Fingerprint (under display, ultrasonic)','USB','USB Type-C 3.2',7),(8,'OS','Android 12, upgradable to Android 13','Resolution','1080 x 2400 pixels','Memory','128GB','RAM','6GB','Camera','64 MP',9),(9,'Memory','512GB','Unlocked','Yes','OS','iOS','Wifi','yes','SIM','nano-sim',10),(10,'OS','WINDOWS 11 Pro','CPU','Ryzen 9 6900HX','GPU','Nivia-RTX 3080','DDR5 Memory','32GB','Dynamic Boots','150W',11),(11,'OS','Window 11','RAM DDR4','8 GB','Intel','Core i5-1035G1','SSD','256 GB','Screen','LED táctil de 15.6”',12),(12,'OS','Window 11','Intel','Core i7','SSD','258GB','RAM','8GB','Screen','15\'\'',13);
/*!40000 ALTER TABLE `product_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `price` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `stock` int DEFAULT '0',
  `discount` int DEFAULT '0',
  `freeShipping` tinyint(1) DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rating` int DEFAULT '1',
  `collectionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `collectionId` (`collectionId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`collectionId`) REFERENCES `collections` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Iphone 14 pro max','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus.','1a8aa35b-a817-43fd-8889-f307b04c1ecc.webp','1258','purple',15,15,1,1,5,1),(2,'PlayStation 5','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus.','8e2afef2-b8a8-47f5-8220-7cb447627dd5.webp','599.99','white',35,3,1,1,5,5),(3,'Xbox Series X','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','2eece821-64f5-4c55-a973-599d59547da1.webp','599.99','black',50,4,1,1,5,5),(4,'PlayStation 5 God of War','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','c44e3f84-4761-4be3-b6c6-6dfa56a752f4.webp','680','white',10,0,1,1,5,5),(5,'Control Xbox Series X','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','9f5c5b47-3dd6-472e-a06e-621ae343f614.webp','120','green',50,1,1,1,5,5),(6,'Iphone 14 pro max','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','e2c62777-93cb-4926-b82b-f93dff912d54.webp','1258','black',15,10,1,1,5,1),(7,'Samsung Galaxy S22 Ultra','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','9e6156ad-f95c-4492-b38e-69714fd6d693.webp','850','black',10,5,1,1,5,2),(8,'Samsung Galaxy Z Fold 4','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','4bb93562-2b8c-4e46-bac6-3e550d12b2bf.webp','778','black',17,0,1,1,5,2),(9,'Honor Magic','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','888819c1-d683-4842-9022-0a990dc271e8.webp','250','green',50,5,1,1,4,3),(10,'Iphone 14 pro max','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','12632d1f-c48d-439e-962e-f4935876bbf0.webp','1258','gold',20,3,1,1,5,1),(11,'ASUS-ROG-Strix-G15-(2022)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','65747536-b3c7-4648-b316-d47b31edc2d6.jpg','1239','black',10,0,1,1,5,4),(12,'Dell-Inspiron-15','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','e475065d-e151-4462-b53d-d02a98bf7a9b.jpg','869','black',16,15,1,1,5,4),(13,'Dell-Inspiron-15-3000','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','8fa1d70e-6929-4fbd-b70f-03e782b183bd.jpg','775','black',20,3,1,1,5,4),(14,'Iphone 11','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','493789a2-66be-4bcd-8e96-5ee990f15264.webp','358','black',8,5,1,1,5,1),(15,'iphone 14 ','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','f417238f-bac7-4936-82f3-aa3602aabe3a.webp','1100','purple',14,15,1,1,5,1),(16,'iphone gold','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget odio neque. In ullamcorper, leo nec tincidunt cursus, erat arcu eleifend nisl, vitae eleifend lacus nulla id augue. Proin condimentum non magna id cursus','81b6bf2e-d003-42a4-8318-acdb3304a77a.webp','1258','gold',10,18,1,1,5,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_infos`
--

DROP TABLE IF EXISTS `shipping_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_infos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `zipCode` varchar(255) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `shipping_infos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_infos`
--

LOCK TABLES `shipping_infos` WRITE;
/*!40000 ALTER TABLE `shipping_infos` DISABLE KEYS */;
INSERT INTO `shipping_infos` VALUES (1,'Venezuela','caracas','Miranda','chacao','+7998425','1088',1),(3,'Venezuela','Pto Ayacucho','Amazonas','Alto parima','7844515','3256',2),(4,'EE.UU','Miami','Florida','10881 NW 7TH ST APT 25-11 MIAMI FL','+20057881','98632',3);
/*!40000 ALTER TABLE `shipping_infos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `confirm` tinyint(1) DEFAULT '0',
  `token` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'customer',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sergio','ventura','sergiovforesto@gmail.com','$2b$10$p9IfM8YZTAAmFKTfGGvSqOhFC19Kj.jA3//P2fY.Y/UTdJSmVTVCe',1,'','admin'),(2,'pedro','garcia','pedro@gmail.com','$2b$10$3p6knuWwVJPCNdOAPxHTD.b3ysYCbVEOwO9ggrAX7AP0LjWZ/gBmG',1,'','customer'),(3,'mikey','shinoba','mikey@gmail.com','$2b$10$1v6zzmAIbs4MO.mIGE6Yve2BT42eWjGIKscQotGrt4hk0OJ3HrTO2',1,'','customer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-09  4:31:13
