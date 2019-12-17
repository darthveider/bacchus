CREATE TABLE `bids` (
  `full_name` varchar(100) NOT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(10) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `bid_amount` float NOT NULL,
  PRIMARY KEY (`full_name`,`date`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
