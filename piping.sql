-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.6.7-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table piping.cml
CREATE TABLE IF NOT EXISTS `cml` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line_number` varchar(50) NOT NULL,
  `cml_number` int(11) NOT NULL,
  `cml_description` varchar(50) NOT NULL,
  `actual_outside_diameter` decimal(20,6) NOT NULL,
  `design_thickness` decimal(20,6) NOT NULL,
  `structural_thickness` decimal(20,6) NOT NULL,
  `required_thickness` decimal(20,6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cml_number` (`cml_number`),
  KEY `line_number` (`line_number`) USING BTREE,
  CONSTRAINT `FK_cml_info` FOREIGN KEY (`line_number`) REFERENCES `info` (`line_number`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table piping.cml: ~4 rows (approximately)
/*!40000 ALTER TABLE `cml` DISABLE KEYS */;
INSERT INTO `cml` (`id`, `line_number`, `cml_number`, `cml_description`, `actual_outside_diameter`, `design_thickness`, `structural_thickness`, `required_thickness`) VALUES
	(21, '6-PL-J4N-01110', 1, 'Design Measurements', 168.300000, 816.270613, 2.800000, 816.270613),
	(22, '6-PL-J4N-01110', 2, 'Design Measurements', 168.300000, 816.270613, 2.800000, 816.270613),
	(23, '6-PL-J4N-01110', 3, 'Design Measurements', 168.300000, 816.270613, 2.800000, 816.270613),
	(24, '6-PL-J4N-01110', 4, 'Design Measurements', 168.300000, 816.270613, 2.800000, 816.270613);
/*!40000 ALTER TABLE `cml` ENABLE KEYS */;

-- Dumping structure for table piping.info
CREATE TABLE IF NOT EXISTS `info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line_number` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `from` varchar(50) NOT NULL,
  `to` varchar(50) NOT NULL,
  `drawing_number` varchar(50) NOT NULL,
  `service` varchar(50) NOT NULL,
  `material` varchar(50) NOT NULL,
  `inservice_date` date NOT NULL,
  `pipe_size` decimal(20,6) NOT NULL,
  `original_thickness` decimal(20,6) NOT NULL,
  `stress` decimal(20,6) NOT NULL,
  `joint_efficiency` decimal(20,6) NOT NULL,
  `ca` decimal(20,6) NOT NULL,
  `design_life` decimal(20,6) NOT NULL,
  `design_pressure` decimal(20,6) NOT NULL,
  `operating_pressure` decimal(20,6) NOT NULL,
  `design_temperature` decimal(20,6) NOT NULL,
  `operating_temperature` decimal(20,6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `line_number` (`line_number`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table piping.info: ~5 rows (approximately)
/*!40000 ALTER TABLE `info` DISABLE KEYS */;
INSERT INTO `info` (`id`, `line_number`, `location`, `from`, `to`, `drawing_number`, `service`, `material`, `inservice_date`, `pipe_size`, `original_thickness`, `stress`, `joint_efficiency`, `ca`, `design_life`, `design_pressure`, `operating_pressure`, `design_temperature`, `operating_temperature`) VALUES
	(1, '6-PL-J4N-01007', 'Dacon A', 'BLACK STARTCOOLED WELL FLUID FROM MDPP ', 'TEST SEPARATOR,V-0111', 'MDA-D-B-26001-1-0-Rev00-2011', 'PL', 'Duplex Stainless Steel', '2023-10-21', 6.000000, 7.100000, 20000.000000, 1.000000, 3.000000, 25.000000, 1015.000000, 327.000000, 140.000000, 45.000000),
	(11, '6-PL-J4N-01110', 'Dacon B', 'BLACK STARTCOOLED WELL FLUID FROM MDPP ', 'TEST SEPARATOR,V-0111', 'MDA-D-B-26001-1-0-Rev00-2011', 'PL', 'Duplex Stainless Steel', '2020-01-01', 6.000000, 7.100000, 20000.000000, 1.000000, 3.000000, 25.000000, 1015.000000, 327.000000, 140.000000, 45.000000),
	(12, '3-GC-J4N-10017', 'Dacon C', 'BLACK STARTCOOLED WELL FLUID FROM MDPP ', 'TEST SEPARATOR,V-0111', 'B17-3-AMA-PR-005-0003', 'GC', 'Duplex Stainless Steel', '2020-01-01', 3.000000, 5.480000, 20000.000000, 1.000000, 3.000000, 25.000000, 1015.000000, 623.000000, 120.000000, 73.270000),
	(13, '3-GC-J4N-10018', 'Dacon A', 'BLACK STARTCOOLED WELL FLUID FROM MDPP ', 'TEST SEPARATOR,V-0111', 'B17-3-AMA-PR-005-0003', 'GC', 'Duplex Stainless Steel', '2020-01-01', 3.000000, 5.480000, 20000.000000, 1.000000, 3.000000, 25.000000, 1015.000000, 623.000000, 120.000000, 73.270000),
	(14, '2-GC-J4N-10034', 'Dacon B', 'BLACK STARTCOOLED WELL FLUID FROM MDPP ', 'TEST SEPARATOR,V-0111', 'B17-3-AMA-PR-005-0003', 'GC', 'Duplex Stainless Steel', '2020-01-01', 2.000000, 3.910000, 20000.000000, 1.000000, 3.000000, 25.000000, 1015.000000, 623.000000, 120.000000, 73.270000);
/*!40000 ALTER TABLE `info` ENABLE KEYS */;

-- Dumping structure for table piping.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Dumping data for table piping.sequelizemeta: ~4 rows (approximately)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20231021045152-your-migration-name.js'),
	('20231021050144-init.js'),
	('20231021051740-init.js'),
	('20231022071857-update-models.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Dumping structure for table piping.test_point
CREATE TABLE IF NOT EXISTS `test_point` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line_number` varchar(50) NOT NULL,
  `cml_number` int(11) NOT NULL,
  `tp_number` int(11) NOT NULL,
  `tp_description` int(11) NOT NULL,
  `note` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tp_number` (`tp_number`),
  KEY `line_number` (`line_number`),
  KEY `cml_number` (`cml_number`),
  CONSTRAINT `FK_test_point_cml` FOREIGN KEY (`cml_number`) REFERENCES `cml` (`cml_number`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_test_point_info` FOREIGN KEY (`line_number`) REFERENCES `info` (`line_number`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table piping.test_point: ~2 rows (approximately)
/*!40000 ALTER TABLE `test_point` DISABLE KEYS */;
INSERT INTO `test_point` (`id`, `line_number`, `cml_number`, `tp_number`, `tp_description`, `note`) VALUES
	(12, '6-PL-J4N-01110', 1, 1, 1, ''),
	(13, '6-PL-J4N-01110', 1, 2, 1, 'Testing');
/*!40000 ALTER TABLE `test_point` ENABLE KEYS */;

-- Dumping structure for table piping.thickness
CREATE TABLE IF NOT EXISTS `thickness` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line_number` varchar(50) NOT NULL,
  `cml_number` int(11) NOT NULL,
  `tp_number` int(11) NOT NULL,
  `inspection_date` date NOT NULL,
  `actual_thickness` decimal(20,6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `line_number` (`line_number`),
  KEY `cml_number` (`cml_number`),
  KEY `tp_number` (`tp_number`),
  CONSTRAINT `FK_thickness_cml` FOREIGN KEY (`cml_number`) REFERENCES `cml` (`cml_number`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_thickness_info` FOREIGN KEY (`line_number`) REFERENCES `info` (`line_number`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_thickness_test_point` FOREIGN KEY (`tp_number`) REFERENCES `test_point` (`tp_number`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table piping.thickness: ~9 rows (approximately)
/*!40000 ALTER TABLE `thickness` DISABLE KEYS */;
INSERT INTO `thickness` (`id`, `line_number`, `cml_number`, `tp_number`, `inspection_date`, `actual_thickness`) VALUES
	(22, '6-PL-J4N-01110', 1, 2, '2023-10-22', 6.500000),
	(23, '6-PL-J4N-01110', 1, 2, '2023-10-22', 6.780000),
	(24, '6-PL-J4N-01110', 1, 2, '2023-10-22', 6.990000),
	(25, '6-PL-J4N-01110', 1, 2, '2023-10-22', 6.870000),
	(26, '6-PL-J4N-01110', 1, 1, '1970-01-01', 6.630000),
	(27, '6-PL-J4N-01110', 1, 1, '2023-10-22', 6.540000),
	(28, '6-PL-J4N-01110', 1, 1, '2023-10-22', 6.770000),
	(29, '6-PL-J4N-01110', 1, 1, '2023-10-22', 6.430000),
	(30, '6-PL-J4N-01110', 1, 1, '2023-10-22', 6.500000);
/*!40000 ALTER TABLE `thickness` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
