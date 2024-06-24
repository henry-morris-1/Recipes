-----------
-- USERS --
-----------
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `username` varchar(100) NOT NULL,
    `password` varchar(128) NOT NULL,
    `salt` varchar(32) NOT NULL,
    UNIQUE KEY (`username`),
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- NOTE: Passwords follow the pattern "[username]password"
DELETE FROM `users`;
INSERT INTO `users` (`user_id`, `username`, `password`, `salt`) VALUES
        (1, 'admin', '9df3f970ff6e9c45abae864a8e8ea1bb9d6f18ca98099a24b14d3348e35998ee3582f4047404fc870b16e56951819a2b7f9a2f3fb0af45aabceb61f54eddcbc8', '51361723dc3d501ffc33535c1fd0a1b2'),
        (2, 'adriane', '0a9ccf83fb40c42db9c9229d79768f7d72fb4c42acb609b107f36dd251a551cc15015f7d8ba585522adf0cce8dadd7087fc8462e25846a233d7ea2c1179d1ae3', '528016538751bdb7e285aabed5be1587'),
        (3, 'jeff', '0eb18adc5931472141affd8c95f98133911aac25f52729643d40d96dffa1e8aa229d840ca3e606cacfca186feb793cc52797cfb980b5f788c18cc638e4ceaed3', '5a1f769ecb8cb173db946329474d48c9'),
        (4, 'henry', 'e8bae31ca295512fe68997c07a833eaf158c81081e8f4be2b8315f78f99a222d38e0d3947a359ab4798fb4af1dc2de2237939a5efad36b0fa6f4a67718cd7d77', '1336dd0b3bcb96f115bc7671dacea761');

-------------
-- RECIPES --
-------------
CREATE TABLE IF NOT EXISTS `recipes` (
    `recipe_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `recipe_name` varchar(100) NOT NULL,
    `is_new` boolean NOT NULL,
    `a_rating` int(10) unsigned,
    `j_rating` int(10) unsigned,
    `h_rating` int(10) unsigned,
    UNIQUE KEY (`recipe_name`),
    PRIMARY KEY (`recipe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `recipes`;
INSERT INTO `recipes` (`recipe_id`, `recipe_name`, `is_new`, `a_rating`, `j_rating`, `h_rating`) VALUES
        (1, 'Southwest Breakfast Skillet', 0, 10, 10, 10),
        (2, 'Gnocchi with Broccoli and Beans', 0, 7, 8, 8),
        (3, 'English Muffins', 0, 9, 9, 8),
        (4, 'Chicken Fajita Bowls', 0, 8, 8, 8),
        (5, 'Pizza', 0, 10, 10, 10),
        (6, 'Waffles', 0, 10, 10, 10),
        (7, 'Turkey Penne Pasta', 0, 10, 9, 9),
        (8, 'Breakfast Sandwiches', 0, 9, 10, 10),
        (9, 'Sheetpan Veggies', 0, 10, 10, 10),
        (10, 'Shrimp Fried Rice', 1, 8, 9, 8),
        (11, 'Breakfast Quesadillas', 0, 10, 10, 10);

----------
-- TAGS --
----------
CREATE TABLE IF NOT EXISTS `tags` (
    `tag_name` varchar(50) NOT NULL,
    PRIMARY KEY (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `tags`;
INSERT INTO `tags` (`tag_name`) VALUES
        ('Breakfast'),
        ('Mexican'),
        ('Meatless'),
        ('Pasta'),
        ('Italian'),
        ('Chicken'),
        ('Sheetpan'),
        ('Turkey'),
        ('Sandwich'),
        ('Side'),
        ('Veggie'),
        ('Asian'),
        ('Stirfry'),
        ('Seafood');

------------------------------
-- RECIPE-TAG RELATIONSHIPS --
------------------------------
CREATE TABLE IF NOT EXISTS `recipe_tags` (
    `recipe_id_fk` int(10) unsigned NOT NULL,
    `tag_name_fk` varchar(50) NOT NULL,
    PRIMARY KEY (`recipe_id_fk`, `tag_name_fk`),
    CONSTRAINT `FK_RECIPE_ID_TAG` FOREIGN KEY (`recipe_id_fk`) REFERENCES `recipes` (`recipe_id`),
    CONSTRAINT `FK_TAG_NAME_RECIPE` FOREIGN KEY (`tag_name_fk`) REFERENCES `tags` (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `recipe_tags`;
INSERT INTO `recipe_tags` (`recipe_id_fk`, `tag_name_fk`) VALUES
        (1, 'Breakfast'),
        (1, 'Mexican'),
        (1, 'Meatless'),
        (2, 'Italian'),
        (2, 'Meatless'),
        (2, 'Pasta'),
        (3, 'Breakfast'),
        (3, 'Meatless'),
        (4, 'Chicken'),
        (4, 'Mexican'),
        (4, 'Sheetpan'),
        (5, 'Italian'),
        (6, 'Breakfast'),
        (6, 'Meatless'),
        (7, 'Italian'),
        (7, 'Pasta'),
        (7, 'Turkey'),
        (8, 'Breakfast'),
        (8, 'Sandwich'),
        (9, 'Side'),
        (9, 'Sheetpan'),
        (9, 'Veggie'),
        (10, 'Asian'),
        (10, 'Seafood'),
        (10, 'Stirfry'),
        (11, 'Breakfast'),
        (11, 'Mexican');

--------------
-- CALENDAR --
--------------
CREATE TABLE IF NOT EXISTS `calendar` (
    `date` date NOT NULL,
    `recipe_id_fk` int(10) unsigned,
    PRIMARY KEY (`date`),
    CONSTRAINT `FK_RECIPE_ID_CALENDAR` FOREIGN KEY (`recipe_id_fk`) REFERENCES `recipes` (`recipe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `calendar`;
INSERT INTO `calendar` (`date`, `recipe_id_fk`) VALUES
    ('2024-06-09', 1),
    ('2024-06-10', 2),
    ('2024-06-11', NULL),
    ('2024-06-12', 3),
    ('2024-06-13', 4),
    ('2024-06-14', NULL),
    ('2024-06-15', 5),
    ('2024-06-16', 6),
    ('2024-06-17', 7),
    ('2024-06-18', NULL),
    ('2024-06-19', 8),
    ('2024-06-20', 9),
    ('2024-06-21', NULL),
    ('2024-06-22', 11),
    ('2024-06-23', 10),
    ('2024-06-24', NULL),
    ('2024-06-25', NULL),
    ('2024-06-26', NULL),
    ('2024-06-27', NULL),
    ('2024-06-28', NULL),
    ('2024-06-29', NULL);