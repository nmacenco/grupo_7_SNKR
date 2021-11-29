CREATE DATABASE `snkr` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `snkr`;

-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: snkr
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `color_products`
--

DROP TABLE IF EXISTS `color_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `color_products` (
  `id_color_products` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `id_color` int(11) NOT NULL,
  PRIMARY KEY (`id_color_products`),
  KEY `color_products_FK` (`id_product`),
  KEY `color_products_FK_1` (`id_color`),
  CONSTRAINT `color_products_FK` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  CONSTRAINT `color_products_FK_1` FOREIGN KEY (`id_color`) REFERENCES `colors` (`id_color`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color_products`
--

LOCK TABLES `color_products` WRITE;
/*!40000 ALTER TABLE `color_products` DISABLE KEYS */;
INSERT INTO `color_products` VALUES (1,1,2),(2,2,4),(3,3,8),(4,4,6),(5,5,4),(68,66,6),(69,67,2),(70,67,6),(71,68,4),(72,68,7),(73,69,2),(74,69,6),(75,69,7),(76,70,4),(77,70,6),(78,70,9),(79,71,6),(80,71,9),(81,71,10),(82,72,2),(83,72,6),(84,72,7);
/*!40000 ALTER TABLE `color_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colors` (
  `id_color` int(11) NOT NULL,
  `color` varchar(45) NOT NULL,
  PRIMARY KEY (`id_color`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Amarillo'),(2,'Turquesa'),(3,'Fucsia'),(4,'Morado'),(5,'Oro'),(6,'Azul'),(7,'Carmesi'),(8,'Verde'),(9,'Violeta'),(10,'Rojo');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id_item` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `unit_price` int(10) unsigned NOT NULL,
  `subtotal` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `image` varchar(255) NOT NULL,
  `color` varchar(200) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_order` int(11) DEFAULT NULL,
  `size` decimal(3,1) NOT NULL,
  PRIMARY KEY (`id_item`),
  UNIQUE KEY `items_id_item_IDX` (`id_item`) USING BTREE,
  KEY `items_id_order_IDX` (`id_order`) USING BTREE,
  KEY `items_id_user_IDX` (`id_user`) USING BTREE,
  CONSTRAINT `items_FK` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `items_FK_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (9,'Reebok Aztrek 96',12999,25998,2,'image-1637769052332.png','1',5,1,1.0),(10,'Puma RS-X Bold',15999,47997,3,'image-1637768944678.png','4',5,1,1.0),(17,'Puma RS-X Bold',15999,47997,3,'image-1637768944678.png','8',5,2,1.0),(18,'Nike Air Max 270 React',18999,56997,3,'image-1637769182573.png','5',2,3,4.0),(19,'Nike Air Force 1 \'07 WB',14999,14999,1,'airforce107wb.png','1',2,3,3.0),(21,'Reebok Aztrek 96',12999,64995,5,'image-1637769052332.png','3',5,4,1.0),(22,'Nike SB Alleyoop',12999,12999,1,'image-1637769105631.png','1',5,5,1.0),(23,'Nike Air Force 1 \'07 WB',14999,44997,3,'airforce107wb.png','1',5,5,1.0),(24,'Nike Air Force 1 \'07 WB',14999,104993,7,'airforce107wb.png','4',6,6,1.0),(25,'Puma RS-X Bold',15999,63996,4,'image-1637768944678.png','1',5,7,5.0);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL AUTO_INCREMENT,
  `total_price` int(11) unsigned NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_order`),
  KEY `orders_FK` (`id_user`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,73995,5),(2,47997,5),(3,71996,2),(4,64995,5),(5,57996,5),(6,104993,6),(7,63996,5);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `detail` varchar(8000) DEFAULT NULL,
  `gender` varchar(100) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Adidas Forum Low',12999.00,'elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor','Unisex','Adidas','Sale','adidas-forum-low.png'),(2,'Nike Air Force 1 \'07 WB',14999.00,'duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut','Unisex','Nike','nan','airforce107wb.png'),(3,'Nike Air Max 97',20999.00,'et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl','Unisex','Nike','home','nike-air-max-97.png'),(4,'Nike Air Max 200 SE',17999.00,'mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper','Unisex','Nike','home','airmax200SE.png'),(5,'Nike Air Jordan 1 Low',18999.00,'non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu','Male','Nike','home','jordan1low.png'),(66,'Puma Fast Intl Game',13999.00,'orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus','Female','Puma','list','image-1637768873050.png'),(67,'Puma RS-X Bold',15999.00,'\"ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin','Male','Puma','list','image-1637768944678.png'),(68,'Reebok Aztrek 96',12999.00,'duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat','Male','Reebok','list','image-1637769052332.png'),(69,'Nike SB Alleyoop',12999.00,'ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique','Unisex','Nike','Sale','image-1637769105631.png'),(70,'Nike Air Max 270 React',18999.00,'tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus','Female','Nike','Sale','image-1637769182573.png'),(71,'Nike Air Max 1 Recycled White',19999.00,'metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus','Female','Nike','list','image-1637769271947.png'),(72,'Puma RS Fast Mix',13999.00,'sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices','Male','Puma','list','image-1637769420478.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_users`
--

DROP TABLE IF EXISTS `products_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_users` (
  `id_products_users` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  PRIMARY KEY (`id_products_users`),
  KEY `products_users_FK` (`id_product`),
  KEY `products_users_FK_1` (`id_user`),
  CONSTRAINT `products_users_FK` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  CONSTRAINT `products_users_FK_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_users`
--

LOCK TABLES `products_users` WRITE;
/*!40000 ALTER TABLE `products_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `size` (
  `id_size` int(11) NOT NULL AUTO_INCREMENT,
  `size` decimal(3,1) NOT NULL,
  PRIMARY KEY (`id_size`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (1,37.0),(2,37.5),(3,38.0),(4,38.5),(5,39.0),(6,39.5),(7,40.0),(8,40.5),(9,41.0),(10,41.5),(11,42.0);
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size_products`
--

DROP TABLE IF EXISTS `size_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `size_products` (
  `id_size_products` int(11) NOT NULL AUTO_INCREMENT,
  `id_size` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  PRIMARY KEY (`id_size_products`),
  KEY `size_products_FK` (`id_product`),
  KEY `size_products_FK_1` (`id_size`),
  CONSTRAINT `size_products_FK` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  CONSTRAINT `size_products_FK_1` FOREIGN KEY (`id_size`) REFERENCES `size` (`id_size`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size_products`
--

LOCK TABLES `size_products` WRITE;
/*!40000 ALTER TABLE `size_products` DISABLE KEYS */;
INSERT INTO `size_products` VALUES (1,3,1),(2,4,2),(3,3,3),(4,8,4),(5,9,5),(58,10,66),(59,11,66),(60,2,67),(61,8,67),(62,3,68),(63,8,68),(64,10,68),(65,2,69),(66,4,69),(67,9,69),(68,1,70),(69,4,70),(70,10,70),(71,3,71),(72,8,71),(73,10,71),(74,2,72),(75,7,72),(76,8,72);
/*!40000 ALTER TABLE `size_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Iron','Man','Iron Man','iron@gmail.com','$2a$10$UftMVwDS7gyUkn6h9I4beOi5vpR9sqNewV5CfBd6nBR6Cjhl3Y9BC','user','1634820686457_img_.jpg'),(4,'Steve','Rogers','Capitan','steve@gmail.com','$2a$10$HHVO5qx148QkRZpSs9dx3eTX30Zt5Y.vRVo0aT0MulPF7WFiH9RI.','user','1634826778405_img_.jpg'),(5,'Nicolas','Macenco',' Nicolas','nico@gmail.com','$2a$10$FcdhMk8CX5hcB2hkFl6SwOrPHz668CUJYdutaYEQsu6oNKUVFmAWu','user','1634826778405_img_.jpg'),(6,'Nicolas','Macenco','Nico','ni@gmail.com','$2a$10$WIsOej0uQTJuaYcfSNCNAOevTcMIEVgj/DRtiTQnBBNRLlFprWkAi','user','1637667057985_img_.jpg'),(7,'Administrador','Admin','Admin','admin@gmail.com','$2a$10$CRXbvGsozXG.B8bze.dh2uzltbMDVGDr/WVfwbbp406SzpfjtCzJq','admin','messi.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'snkr'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-29  9:45:22
