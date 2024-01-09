
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
-- Table structure for table `tbl_block_index_info`
--

DROP TABLE IF EXISTS `tbl_block_index_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_block_index_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block` bigint(20) DEFAULT NULL,
  `flag` int(2) DEFAULT '0' COMMENT '是否处理过',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_current_block_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=330524 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_current_block`
--

DROP TABLE IF EXISTS `tbl_current_block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_current_block` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_current_block_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_drc_balance`
--

DROP TABLE IF EXISTS `tbl_drc_balance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_drc_balance` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(200) DEFAULT NULL,
  `tick` varchar(20) DEFAULT NULL,
  `balance` bigint(20) DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_drc_balance_id_uindex` (`id`),
  KEY `tbl_db__index_at` (`address`,`tick`),
  KEY `tbl_db_ndex_add` (`address`)
) ENGINE=InnoDB AUTO_INCREMENT=17854 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_drc_info`
--

DROP TABLE IF EXISTS `tbl_drc_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_drc_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tick` varchar(10) DEFAULT NULL,
  `owener_address` varchar(200) DEFAULT NULL,
  `deploy_time` timestamp NULL DEFAULT NULL,
  `max` bigint(20) DEFAULT '0',
  `lim` bigint(20) DEFAULT '0',
  `mint_val` bigint(20) DEFAULT '0',
  `mint_over` int(11) DEFAULT '0',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_drc_info_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_nft_block_index_info`
--

DROP TABLE IF EXISTS `tbl_nft_block_index_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_nft_block_index_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block` bigint(20) DEFAULT NULL,
  `flag` int(2) DEFAULT '0' COMMENT '是否处理过',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_nft_block_index_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=331468 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_nft_current_block`
--

DROP TABLE IF EXISTS `tbl_nft_current_block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_nft_current_block` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_nft_current_block_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_nft_holders`
--

DROP TABLE IF EXISTS `tbl_nft_holders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_nft_holders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nft_txid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tick` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nft_index` int(11) DEFAULT NULL,
  `nft_owner` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latest_txid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `get_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_nft_holders_id_uindex` (`id`),
  KEY `tbl_nft_holders_add` (`nft_owner`),
  KEY `tbl_nft_holders_ss` (`tick`,`nft_txid`),
  KEY `tbl_nft_holders_tick` (`tick`)
) ENGINE=InnoDB AUTO_INCREMENT=35252 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_nft_info`
--

DROP TABLE IF EXISTS `tbl_nft_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_nft_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `txid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tick` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `max` bigint(20) DEFAULT NULL,
  `buri` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owener_address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `mint_val` int(11) DEFAULT '0',
  `mint_over` int(11) DEFAULT '0',
  `create_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_nft_info_id_uindex` (`id`),
  KEY `tbl_nft_info__txid` (`txid`),
  KEY `tbl_nft_info_tick` (`tick`)
) ENGINE=InnoDB AUTO_INCREMENT=462 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_nft_transfer_info`
--

DROP TABLE IF EXISTS `tbl_nft_transfer_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_nft_transfer_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sender` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txid` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nft_txid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nft_index` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_nft_transfer_info_id_uindex` (`id`),
  KEY `tbl_nft_transfer_info_re` (`receiver`),
  KEY `tbl_nft_transfer_info_sender` (`sender`),
  KEY `tbl_nft_transfer_info_tck` (`nft_txid`,`nft_index`)
) ENGINE=InnoDB AUTO_INCREMENT=5228 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_nft_tx_info`
--

DROP TABLE IF EXISTS `tbl_nft_tx_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_nft_tx_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `out_address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txid_in` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '输入交易的关联id',
  `block` int(11) DEFAULT NULL,
  `flag` int(11) DEFAULT '0' COMMENT '是否处理过',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tx_index` int(11) DEFAULT NULL,
  `op` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_tx_info_id_uindex` (`id`),
  KEY `tbl_tx_info__block` (`block`),
  KEY `tbl_tx_info__ad` (`out_address`),
  KEY `tbl_tx_info__txid` (`txid`),
  KEY `tbl_tx_info_in` (`txid_in`),
  KEY `tbl_nft_tx_info_createtime` (`create_date`)
) ENGINE=InnoDB AUTO_INCREMENT=53498 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_transfer_info`
--

DROP TABLE IF EXISTS `tbl_transfer_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_transfer_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(200) DEFAULT NULL,
  `amt` bigint(20) DEFAULT NULL,
  `txnid` varchar(200) DEFAULT NULL,
  `crate_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `flag` int(11) DEFAULT '0',
  `tick` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_transfer_info_id_uindex` (`id`),
  KEY `tbl_tf_index_address` (`address`)
) ENGINE=InnoDB AUTO_INCREMENT=68563 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_tx_info`
--

DROP TABLE IF EXISTS `tbl_tx_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_tx_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnid_pre` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '输入交易的关联id',
  `block` int(11) DEFAULT NULL,
  `flag` int(11) DEFAULT '0' COMMENT '是否处理过',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tx_index` int(11) DEFAULT NULL,
  `op` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_tx_info_id_uindex` (`id`),
  KEY `tbl_tx_info__block` (`block`),
  KEY `tbl_tx_info__ad` (`address`),
  KEY `tbl_tx_info__txid` (`txnid`)
) ENGINE=InnoDB AUTO_INCREMENT=494488 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_tx_transfer_info`
--

DROP TABLE IF EXISTS `tbl_tx_transfer_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_tx_transfer_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sender` varchar(100) DEFAULT NULL,
  `receiver` varchar(100) DEFAULT NULL,
  `txid` varchar(200) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tick` varchar(10) DEFAULT NULL,
  `amt` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_tx_transfer_info_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58192 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
