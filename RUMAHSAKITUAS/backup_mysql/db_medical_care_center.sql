-- MySQL dump 10.13  Distrib 9.2.0, for Win64 (x86_64)
--
-- Host: localhost    Database: medical_care_center
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `nama_admin` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','scrypt:32768:8:1$2PsvzZP1AFhilWQB$bcf381f6cdfad8fbed2d2ea7d0b119b554199d27ca3175caf10ed7bbfbfd30f42970f25b8a1706faac3a9cddb00d6ee566bdc2cdae610d68c37a877121c7280b');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `antrian`
--

DROP TABLE IF EXISTS `antrian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `antrian` (
  `id_antrian` int NOT NULL AUTO_INCREMENT,
  `id_pasien` int DEFAULT NULL,
  `id_dokter` int DEFAULT NULL,
  `id_poli` int DEFAULT NULL,
  `tanggal_kunjungan` date DEFAULT NULL,
  `nomor_antrian` int DEFAULT NULL,
  `status` enum('Menunggu','Dipanggil','Selesai','Batal') DEFAULT 'Menunggu',
  `keluhan` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_antrian`),
  KEY `id_pasien` (`id_pasien`),
  KEY `id_dokter` (`id_dokter`),
  KEY `id_poli` (`id_poli`),
  CONSTRAINT `antrian_ibfk_1` FOREIGN KEY (`id_pasien`) REFERENCES `pasien` (`id_pasien`),
  CONSTRAINT `antrian_ibfk_2` FOREIGN KEY (`id_dokter`) REFERENCES `dokter` (`id_dokter`),
  CONSTRAINT `antrian_ibfk_3` FOREIGN KEY (`id_poli`) REFERENCES `poli` (`id_poli`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `antrian`
--

LOCK TABLES `antrian` WRITE;
/*!40000 ALTER TABLE `antrian` DISABLE KEYS */;
INSERT INTO `antrian` VALUES (1,4,2,2,'2025-12-16',1,'Menunggu','gigi geraham saya bengkak, susah untuk membuka mulut','2025-12-16 02:06:17');
/*!40000 ALTER TABLE `antrian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dokter`
--

DROP TABLE IF EXISTS `dokter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dokter` (
  `id_dokter` int NOT NULL AUTO_INCREMENT,
  `nama_dokter` varchar(100) NOT NULL,
  `spesialisasi` varchar(100) DEFAULT NULL,
  `id_poli` int DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `no_sip` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_dokter`),
  KEY `id_poli` (`id_poli`),
  CONSTRAINT `dokter_ibfk_1` FOREIGN KEY (`id_poli`) REFERENCES `poli` (`id_poli`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dokter`
--

LOCK TABLES `dokter` WRITE;
/*!40000 ALTER TABLE `dokter` DISABLE KEYS */;
INSERT INTO `dokter` VALUES (1,'Dr. Ahmad Hidayat, Sp.PD','Spesialis Penyakit Dalam',3,'dokter1.jpg','SIP/2023/001','2025-12-15 05:27:25'),(2,'Dr. Siti Nurhaliza, Sp.KG','Spesialis Kedokteran Gigi',2,'dokter2.jpg','SIP/2023/002','2025-12-15 05:27:25'),(3,'Dr. Budi Santoso','Dokter Umum',1,'dokter3.jpg','SIP/2023/003','2025-12-15 05:27:25'),(4,'Dr. Linda Wijaya, Sp.PD','Spesialis Penyakit Dalam',3,'dokter4.jpg','SIP/2023/004','2025-12-15 05:27:25'),(5,'Dr. Rina Kusuma','Dokter Umum',1,'dokter5.jpg','SIP/2023/005','2025-12-15 05:27:25'),(6,'Dr. Hendra Gunawan, Sp.KG','Spesialis Kedokteran Gigi',2,'dokter6.jpg','SIP/2023/006','2025-12-15 05:27:25');
/*!40000 ALTER TABLE `dokter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jadwal_praktik`
--

DROP TABLE IF EXISTS `jadwal_praktik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jadwal_praktik` (
  `id_jadwal` int NOT NULL AUTO_INCREMENT,
  `id_dokter` int DEFAULT NULL,
  `hari` varchar(20) DEFAULT NULL,
  `jam_mulai` time DEFAULT NULL,
  `jam_selesai` time DEFAULT NULL,
  `kuota_pasien` int DEFAULT '20',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_jadwal`),
  KEY `id_dokter` (`id_dokter`),
  CONSTRAINT `jadwal_praktik_ibfk_1` FOREIGN KEY (`id_dokter`) REFERENCES `dokter` (`id_dokter`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jadwal_praktik`
--

LOCK TABLES `jadwal_praktik` WRITE;
/*!40000 ALTER TABLE `jadwal_praktik` DISABLE KEYS */;
INSERT INTO `jadwal_praktik` VALUES (1,1,'Senin','08:00:00','12:00:00',20,'2025-12-15 05:27:41'),(2,1,'Rabu','08:00:00','12:00:00',20,'2025-12-15 05:27:41'),(3,1,'Jumat','08:00:00','12:00:00',20,'2025-12-15 05:27:41'),(4,2,'Selasa','09:00:00','14:00:00',15,'2025-12-15 05:27:41'),(5,2,'Kamis','09:00:00','14:00:00',15,'2025-12-15 05:27:41'),(6,2,'Sabtu','09:00:00','13:00:00',15,'2025-12-15 05:27:41'),(7,3,'Senin','13:00:00','17:00:00',25,'2025-12-15 05:27:41'),(8,3,'Selasa','13:00:00','17:00:00',25,'2025-12-15 05:27:41'),(9,3,'Rabu','13:00:00','17:00:00',25,'2025-12-15 05:27:41'),(10,3,'Kamis','13:00:00','17:00:00',25,'2025-12-15 05:27:41'),(11,3,'Jumat','13:00:00','17:00:00',25,'2025-12-15 05:27:41'),(12,4,'Selasa','14:00:00','18:00:00',20,'2025-12-15 05:27:41'),(13,4,'Kamis','14:00:00','18:00:00',20,'2025-12-15 05:27:41'),(14,4,'Sabtu','08:00:00','12:00:00',20,'2025-12-15 05:27:41'),(15,5,'Senin','08:00:00','12:00:00',25,'2025-12-15 05:27:41'),(16,5,'Rabu','08:00:00','12:00:00',25,'2025-12-15 05:27:41'),(17,5,'Jumat','08:00:00','12:00:00',25,'2025-12-15 05:27:41'),(18,6,'Senin','14:00:00','18:00:00',15,'2025-12-15 05:27:41'),(19,6,'Rabu','14:00:00','18:00:00',15,'2025-12-15 05:27:41'),(20,6,'Jumat','14:00:00','18:00:00',15,'2025-12-15 05:27:41');
/*!40000 ALTER TABLE `jadwal_praktik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obat`
--

DROP TABLE IF EXISTS `obat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obat` (
  `id_obat` int NOT NULL AUTO_INCREMENT,
  `nama_obat` varchar(100) DEFAULT NULL,
  `fungsi` text,
  `stok` int DEFAULT NULL,
  `harga` int DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_obat`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obat`
--

LOCK TABLES `obat` WRITE;
/*!40000 ALTER TABLE `obat` DISABLE KEYS */;
INSERT INTO `obat` VALUES (1,'Paracetamol','Demam dan sakit kepala',10,5000,'paracetamol.jpg'),(2,'degirol tablet hisap','untuk mengatasi infeksi ringan pada mulut dan tenggorokan',50,15000,'degirol.jpg');
/*!40000 ALTER TABLE `obat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pasien`
--

DROP TABLE IF EXISTS `pasien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pasien` (
  `id_pasien` int NOT NULL AUTO_INCREMENT,
  `no_rekam_medis` varchar(20) DEFAULT NULL,
  `nama_pasien` varchar(100) NOT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') DEFAULT NULL,
  `alamat` text,
  `no_telepon` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pasien`),
  UNIQUE KEY `no_rekam_medis` (`no_rekam_medis`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pasien`
--

LOCK TABLES `pasien` WRITE;
/*!40000 ALTER TABLE `pasien` DISABLE KEYS */;
INSERT INTO `pasien` VALUES (1,'RM2024001','Andi Wijaya','1990-05-15','Laki-laki','Jl. Merdeka No. 123, Jakarta','081234567890','andi.wijaya@email.com','2025-12-15 05:28:13'),(2,'RM2024002','Siti Aminah','1985-08-20','Perempuan','Jl. Sudirman No. 456, Jakarta','081234567891','siti.aminah@email.com','2025-12-15 05:28:13'),(3,'RM2024003','Budi Hartono','1978-03-10','Laki-laki','Jl. Gatot Subroto No. 789, Jakarta','081234567892','budi.hartono@email.com','2025-12-15 05:28:13'),(4,'RM2024004','haechan','2004-06-06','Laki-laki','singotrunan','085336154296','haechan@gmail.com','2025-12-16 02:06:17');
/*!40000 ALTER TABLE `pasien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poli`
--

DROP TABLE IF EXISTS `poli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poli` (
  `id_poli` int NOT NULL AUTO_INCREMENT,
  `nama_poli` varchar(100) NOT NULL,
  `deskripsi` text,
  `icon` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_poli`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poli`
--

LOCK TABLES `poli` WRITE;
/*!40000 ALTER TABLE `poli` DISABLE KEYS */;
INSERT INTO `poli` VALUES (1,'Poli Umum','Pelayanan kesehatan umum untuk berbagai keluhan ringan hingga sedang','fa-user-doctor','2025-12-15 05:27:08'),(2,'Poli Gigi','Pelayanan kesehatan gigi dan mulut termasuk penambalan, scaling, dan cabut gigi','fa-tooth','2025-12-15 05:27:08'),(3,'Poli Dalam','Pelayanan spesialis penyakit dalam seperti diabetes, hipertensi, dan gangguan pencernaan','fa-heart-pulse','2025-12-15 05:27:08');
/*!40000 ALTER TABLE `poli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slider`
--

DROP TABLE IF EXISTS `slider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slider` (
  `id_slider` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(200) DEFAULT NULL,
  `deskripsi` text,
  `gambar` varchar(255) DEFAULT NULL,
  `urutan` int DEFAULT NULL,
  `aktif` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_slider`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slider`
--

LOCK TABLES `slider` WRITE;
/*!40000 ALTER TABLE `slider` DISABLE KEYS */;
INSERT INTO `slider` VALUES (1,'Selamat Datang di Medical Care Center','Rumah sakit terpercaya dengan pelayanan kesehatan terbaik untuk keluarga Anda','slider1.jpg',1,1,'2025-12-15 05:27:52'),(2,'Fasilitas Medis Modern','Dilengkapi dengan peralatan medis canggih dan tenaga medis profesional berpengalaman','slider2.jpg',2,1,'2025-12-15 05:27:52'),(3,'Layanan 24 Jam','Siap melayani kebutuhan kesehatan Anda setiap saat dengan unit gawat darurat 24 jam','slider3.jpg',3,1,'2025-12-15 05:27:52');
/*!40000 ALTER TABLE `slider` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-20 15:48:00
