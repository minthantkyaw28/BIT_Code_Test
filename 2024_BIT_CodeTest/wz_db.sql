-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 23, 2017 at 09:24 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wz_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `content_owner`
--

CREATE TABLE IF NOT EXISTS `content_owner` (
`idx` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `content_owner`
--

INSERT INTO `content_owner` (`idx`, `name`) VALUES
(1, 'ခင္ေဆြဦး'),
(2, 'တိုးထက္'),
(3, 'မင္းကိုႏိုင္'),
(4, 'မိုးမိုး (အင္းလ်ား)'),
(5, ' ႏိုင္ေဇာ္ (Lazy Club)'),
(6, 'Synergy Publishing'),
(7, 'သန္း၀င္းလိႈင္'),
(8, 'ရာျပည့္'),
(9, 'ခ်စ္ဦးညိဳ'),
(10, 'အၾကည္ေတာ္');

-- --------------------------------------------------------

--
-- Table structure for table `publisher`
--

CREATE TABLE IF NOT EXISTS `publisher` (
`idx` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `publisher`
--

INSERT INTO `publisher` (`idx`, `name`) VALUES
(1, 'ခင္ေဆြဦး'),
(2, 'ဆင္ျဖဴကၽြန္း ေက်ာ္လႈိင္ဦး'),
(3, 'မင္းကိုႏိုင္'),
(4, 'မိုးမိုး (အင္းလ်ား)'),
(5, ' ႏိုင္ေဇာ္ (Lazy Club)'),
(6, ' ႏိုင္းႏိုင္းစေန'),
(7, 'သန္း၀င္းလိႈင္'),
(8, 'ရာျပည့္ဦးစိုးညြန္႕'),
(9, 'ခ်စ္ဦးညို'),
(10, 'အၾကည္ေတာ္');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_book`
--

CREATE TABLE IF NOT EXISTS `tbl_book` (
`idx` int(11) NOT NULL,
  `co_id` int(11) NOT NULL,
  `publisher_id` int(11) NOT NULL,
  `book_uniq_idx` varchar(255) NOT NULL,
  `bookname` varchar(255) NOT NULL,
  `cover_photo` varchar(255) NOT NULL,
  `prize` int(11) NOT NULL,
  `created_timetick` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_book`
--

INSERT INTO `tbl_book` (`idx`, `co_id`, `publisher_id`, `book_uniq_idx`, `bookname`, `cover_photo`, `price`, `created_timetick`) VALUES
(5, 1, 1, 'BOK0005', 'ေအာင္ရဲ႕ေအာင္', 'bok0005.png', 600, '2014-03-01 00:00:00'),
(6, 1, 1, 'BOK0006', 'စစ္ကိုင္းသမီး ဒိုင္ယာရီ', 'bok0005.png', 800, '2014-03-01 00:00:00'),
(7, 1, 1, 'BOK0007', 'ဝါဆိုဦးကပန္ဖူးတယ္', 'bok0005.png', 800, '2014-03-01 00:00:00'),
(8, 2, 2, 'BOK0008', 'အမ်ိဳးသားအားနည္းေရာဂါႏွင့္ အျခားက်န္းမာေရးေဆာင္းပါးမ်ား', 'bok0005.png', 600, '2014-03-01 00:00:00'),
(9, 3, 3, 'BOK0009', 'ေနာက္ၾကည့္မွန္', 'bok0005.png', 1200, '2014-03-01 00:00:00'),
(10, 4, 4, 'BOK0010', 'ခံတက္ႏူေလးေတြညိွးခ်ိန္တန္ေတာ့', 'bok0005.png', 0, '2014-03-01 00:00:00'),
(11, 4, 4, 'BOK0011', 'သံုးလြန္းတင္မွၾကိဳး', 'bok0005.png', 0, '2014-03-01 00:00:00'),
(12, 4, 4, 'BOK0012', 'ပြင့္တခ်ိဳ႕ ေၾကြတခ်ိဳ႕ ', 'bok0005.png', 0, '2014-03-01 00:00:00'),
(13, 5, 5, 'BOK0013', 'ကၽြန္ေတာ္ႏွင့္ ကၽြန္ေတာ့္အလၤကာ', 'bok0005.png', 600, '2014-03-01 00:00:00'),
(14, 5, 5, 'BOK0014', 'ကၽြန္ေတာ္ႏွင့္ ကၽြန္ေတာ့္ပတ္၀န္းက်င္', 'bok0005.png', 600, '2014-03-01 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `content_owner`
--
ALTER TABLE `content_owner`
 ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `publisher`
--
ALTER TABLE `publisher`
 ADD PRIMARY KEY (`idx`);

--
-- Indexes for table `tbl_book`
--
ALTER TABLE `tbl_book`
 ADD PRIMARY KEY (`idx`), ADD KEY `book_uniq_idx` (`book_uniq_idx`), ADD KEY `publisher_id` (`publisher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `content_owner`
--
ALTER TABLE `content_owner`
MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `publisher`
--
ALTER TABLE `publisher`
MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `tbl_book`
--
ALTER TABLE `tbl_book`
MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
