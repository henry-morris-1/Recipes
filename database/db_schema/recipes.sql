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
    `a_rating` int(10) unsigned,
    `j_rating` int(10) unsigned,
    `h_rating` int(10) unsigned,
    UNIQUE KEY (`recipe_name`),
    PRIMARY KEY (`recipe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `recipes`;
INSERT INTO `recipes` (`recipe_id`, `recipe_name`, `a_rating`, `j_rating`, `h_rating`) VALUES
        (1, 'Chili', 10, 10, 10),
        (2, 'Skillet Ravioli Lasagna', 10, 10, 10),
        (3, 'Kale & Lentil Stew with Mashed Potatoes', 8, 9, 9),
        (4, 'Crispy Smashed Brussels Sprouts with Balsamic & Parmesan', 9, 9, 9),
        (5, 'Spring Fried Rice', 9, 9, 9),
        (6, 'Sheet Pan Roasted Root Vegetables', 8, 8, 8),
        (7, 'Italian-Style Turkey & Penne Skillet', 10, 9, 9),
        (8, 'Spinach & Feta Scrambled Egg Pitas', 8, 7, 7),
        (9, 'Eggs in Tomato Sauce with Chickpeas & Spinach', 9, 8, 7),
        (10, 'Chicken Enchilada Soup', 10, 10, 10),
        (11, 'Grilled Chicken with Red Pepper-Pecan Romesco Sauce', 10, 10, 10),
        (12, 'Sheet Pan Gnocchi with Broccoli & White Beans', 7, 8, 8),
        (13, 'Cheesy Black Bean & Quinoa Skillet Casserole', 9, 9, 8),
        (14, 'High Protein Spaghetti with Chicken & Broccoli', 10, 9, 9),
        (15, 'Salad with Chicken & Crispy Farro', 10, 9, 9),
        (16, 'Chicken Lettuce Wraps', 10, 9, 9),
        (17, 'Banana Baked Oatmeal', 10, 9, 8),
        (18, 'Chicken Enchilada Skillet Casserole', 10, 9, 9),
        (19, 'Spinach Salad with Quinoa, Chicken & Fresh Berries', 10, 10, 10),
        (20, 'Sheet Pan Chicken Fajita Bowls', 10, 9, 9),
        (21, 'Baked Chicken & Ricotta Meatballs', 9, 9, 9),
        (22, 'Taco Salad Crunch', 10, 9, 8),
        (23, 'Breakfast Naan Pizza', 9, 10, 7),
        (24, 'Four Bean & Pumpkin Chili', 9, 9, 9),
        (25, 'Sheet Pan Huevos Rancheros', 9, 8, 8),
        (26, 'Farro Burrito Bowls', 7, 7, 7),
        (27, 'Pasta e Fagioli', 10, 9, 8),
        (28, '5 Ingredient Lemon Chicken with Asparagus', 8, 8, 8),
        (29, 'Quick Bean & Tuna Salad', 10, 10, 9),
        (30, 'Sheet Pan Balsamic Parmesan Roasted Chickpeas & Vegetables', 10, 10, 10),
        (31, 'One Pot Lentil & Vegetable Soup with Parmesan', 9, 9, 8),
        (32, 'Baked Zucchini, Feta & Egg Tortilla', 10, 9, 9),
        (33, 'Scallion Ginger Beef & Broccoli', 9, 9, 9),
        (34, 'Garlic Parmesan Melting Potatoes', 9, 9, 9),
        (35, 'Roasted Zucchini with Parmesan & Lemon', 10, 10, 10),
        (36, 'Crispy Hot Honey Salmon Bites', 10, 9, 8),
        (37, 'Grains and Greens Scramble', 10, 10, 10),
        (38, 'Zucchini, Corn, & Egg Casserole', 8, 9, 7),
        (39, "Tracy's Mac & Cheese", 9, 9, 8),
        (40, 'Breakfast Beans with Microwave Poached Egg', 9, 9, 9),
        (41, '20 Minute Creamy Tomato Salmon Skillet', 9, 9, 8),
        (42, 'Honey Garlic Butter Shrimp', 9, 9, 10),
        (43, '"Egg in a Hole" Peppers with Avocado Salsa', 8, 8, 8),
        (44, 'Shrimp & Broccoli Penne', 8, 8, 8),
        (45, 'Chicken Cutlets with Creamy Spinach & Roasted Red Pepper Sauce', 8, 9, 8),
        (46, 'Charred Sprimp, Pesto & Quinoa Bowls', 8, 7, 7),
        (47, 'Egg Roll Skillet', 9, 8, 8),
        (48, 'Lemon Ricotta Pancakes', 10, 10, 10),
        (49, 'Shrimp Stir Fry', 8, 8, 8),
        (50, 'Low Carb Cauliflower Fried Rice with Shrimp', 9, 8, 7),
        (51, 'Pizza', 10, 10, 10),
        (52, 'Crispy Salmon Rice Bowl', 9, 8, 8),
        (53, 'Sweet Pea Lemon Pasta', 10, 10, 10),
        (54, 'Honey Mustard Pork with Spinach & Smashed White Beans', 9, 9, 9),
        (55, 'Garlic Lime Pork with Farro & Spinach', 10, 9, 9),
        (56, 'Green Chile Rotisserie Chicken Casserole', 8, 8, 7),
        (57, 'Honey Garlic Chicken Thighs with Carrots & Broccoli', 8, 7, 8),
        (58, 'Strawberry Balsamic Spinach Salad with Chicken', 8, 8, 8),
        (59, 'Califlower Chicken Fried Rice', 9, 9, 9),
        (60, 'Classic Sesame Noodles with Chicken', 8, 8, 8),
        (61, 'White Chicken Chili Casserole', 10, 10, 10),
        (62, 'Chicken & Zucchini Casserole', 8, 9, 9),
        (63, 'Southwest Breakfast Skillet', 10, 10, 10),
        (64, 'Pesto Chicken Bake', 8, 8, 7),
        (65, 'Bean & Veggie Taco Bowl', 9, 8, 7),
        (66, 'Sweet Potato Nachos', 9, 9, 8),
        (67, 'One Pan Chicken & Asparagus Bake', 9, 8, 8),
        (68, 'Spicy Orange Chicken & Broccoli Stirfry', 8, 7, 6),
        (69, 'Zucchini Enchiladas', 10, 10, 10),
        (70, 'Sweet & Sour Chicken Noodle Bowl', 10, 9, 9),
        (71, 'Teriyaki Chicken Skillet Casserole with Broccoli', 10, 9, 9),
        (72, 'One Pot White Bean, Spinach & Sun Dried Tomato Orzo', 7, 8, 8),
        (73, 'Slow Cooker Barley & Chickpea Risotto', 8, 8, 8),
        (74, 'Spaghetti & Meatballs', 10, 10, 9),
        (75, 'Swedish Meatballs', 7, 9, 9),
        (76, 'French Toast', 9, 9, 9),
        (77, 'Biscuits', 10, 10, 10),
        (78, 'Toast', 8, 8, 8),
        (79, 'Waffles', 9, 10, 9),
        (80, 'Pancakes', 10, 10, 10),
        (81, 'Breakfast Sandwiches', 10, 10, 10),
        (82, 'Breakfast Quesadillas', 10, 10, 10),
        (83, 'Breakfast Burritos', 10, 10, 10),
        (84, 'Steak', NULL, NULL, NULL),
        (85, 'Grilled Chicken', NULL, NULL, NULL),
        (86, 'Pork Chops', NULL, NULL, NULL),
        (87, 'Salmon Tacos with Pineapple Salsa', NULL, NULL, NULL),
        (88, 'Skillet Bruschetta Chicken', NULL, NULL, NULL),
        (89, 'Marry Me Shrimp Pasta', NULL, NULL, NULL),
        (90, 'Lemon Sopressata Chicken', NULL, NULL, NULL),
        (91, 'Plant Based Sheet Pan Pesto Bowl', NULL, NULL, NULL),
        (92, 'Chicken & Quinoa Casserole', NULL, NULL, NULL),
        (93, 'Chicken & Vegetable Penne with Parsley Walnut Pesto', NULL, NULL, NULL),
        (94, 'Crispy Fish Taco Bowls', NULL, NULL, NULL),
        (95, 'Southwest Cauliflower Rice Bowls with Shrimp & Avocado Crema', NULL, NULL, NULL),
        (96, 'Baked Broccoli Cheddar Quinoa Bites', NULL, NULL, NULL),
        (97, 'Winter Greens Bowl', NULL, NULL, NULL),
        (98, 'Sheet Pan Garlic Soy Chicken & Vegetables', NULL, NULL, NULL),
        (99, 'Skillet Green Chile Chicken Enchilada Casserole', NULL, NULL, NULL),
        (100, 'Couscous Salad', NULL, NULL, NULL),
        (101, 'Roasted Garlic Parmesan Cabbage', NULL, NULL, NULL),
        (102, 'Lemon Chicken Pasta', NULL, NULL, NULL),
        (103, 'Chicken Cutlets with Roasted Red Pepper & Arugula Relish', NULL, NULL, NULL),
        (104, 'Quinoa Chickpea Salad with Roasted Red Pepper Hummus Dressing', NULL, NULL, NULL),
        (105, 'Honey Lime Chicken and Veggies', NULL, NULL, NULL),
        (106, 'Roasted Gnocchi & Brussels Sprouts with Meyer Lemon Vinaigrette', NULL, NULL, NULL),
        (107, 'Quinoa Power Salad', NULL, NULL, NULL),
        (108, 'Chopped Power Salad with Chicken', NULL, NULL, NULL);

----------
-- TAGS --
----------
CREATE TABLE IF NOT EXISTS `tags` (
    `tag_name` varchar(50) NOT NULL,
    PRIMARY KEY (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `tags`;
INSERT INTO `tags` (`tag_name`) VALUES
        ('Asian'),
        ('Baked Good'),
        ('Beans'),
        ('Beef'),
        ('Breakfast'),
        ('Chicken'),
        ('Fruit'),
        ('Grains'),
        ('Griddle'),
        ('Grilled'),
        ('Italian'),
        ('Meatless'),
        ('Mediterranean'),
        ('Mexican'),
        ('Pasta'),
        ('Pork'),
        ('Rice'),
        ('Salad'),
        ('Sandwich'),
        ('Scandinavian'),
        ('Seafood'),
        ('Sheet Pan'),
        ('Side'),
        ('Skillet'),
        ('Slow Cooker'),
        ('Soup/Stew'),
        ('Spanish'),
        ('Stirfry'),
        ('Turkey'),
        ('Veggie');

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
        (1, 'Beans'),
        (1, 'Beef'),
        (1, 'Slow Cooker'),
        (1, 'Soup/Stew'),
        (2, 'Beef'),
        (2, 'Italian'),
        (2, 'Pasta'),
        (2, 'Skillet'),
        (3, 'Beans'),
        (3, 'Meatless'),
        (3, 'Soup/Stew'),
        (3, 'Veggie'),
        (4, 'Meatless'),
        (4, 'Side'),
        (4, 'Sheet Pan'),
        (4, 'Veggie'),
        (5, 'Asian'),
        (5, 'Chicken'),
        (5, 'Stirfry'),
        (5, 'Rice'),
        (6, 'Meatless'),
        (6, 'Side'),
        (6, 'Sheet Pan'),
        (6, 'Veggie'),
        (7, 'Italian'),
        (7, 'Pasta'),
        (7, 'Skillet'),
        (7, 'Turkey'),
        (8, 'Breakfast'),
        (8, 'Meatless'),
        (8, 'Mediterranean'),
        (8, 'Sandwich'),
        (9, 'Beans'),
        (9, 'Breakfast'),
        (9, 'Meatless'),
        (10, 'Chicken'),
        (10, 'Mexican'),
        (10, 'Soup/Stew'),
        (11, 'Chicken'),
        (11, 'Grilled'),
        (11, 'Spanish'),
        (12, 'Beans'),
        (12, 'Meatless'),
        (12, 'Pasta'),
        (12, 'Veggie'),
        (13, 'Beans'),
        (13, 'Grains'),
        (13, 'Meatless'),
        (13, 'Mexican'),
        (13, 'Skillet'),
        (14, 'Chicken'),
        (14, 'Italian'),
        (14, 'Pasta'),
        (15, 'Chicken'),
        (15, 'Grains'),
        (15, 'Salad'),
        (15, 'Veggie'),
        (16, 'Asian'),
        (16, 'Chicken'),
        (16, 'Veggie'),
        (17, 'Baked Good'),
        (17, 'Breakfast'),
        (17, 'Fruit'),
        (17, 'Meatless'),
        (18, 'Chicken'),
        (18, 'Mexican'),
        (18, 'Skillet'),
        (19, 'Chicken'),
        (19, 'Fruit'),
        (19, 'Grains'),
        (19, 'Salad'),
        (19, 'Veggie'),
        (20, 'Chicken'),
        (20, 'Mexican'),
        (20, 'Sheet Pan'),
        (21, 'Chicken'),
        (21, 'Italian'),
        (21, 'Sheet Pan'),
        (22, 'Beans'),
        (22, 'Beef'),
        (22, 'Mexican'),
        (23, 'Breakfast'),
        (23, 'Meatless'),
        (23, 'Mediterranean'),
        (24, 'Beans'),
        (24, 'Meatless'),
        (24, 'Soup/Stew'),
        (25, 'Breakfast'),
        (25, 'Mexican'),
        (25, 'Sheet Pan'),
        (26, 'Grains'),
        (26, 'Meatless'),
        (26, 'Mexican'),
        (26, 'Side'),
        (26, 'Veggie'),
        (27, 'Beans'),
        (27, 'Italian'),
        (27, 'Pasta'),
        (28, 'Chicken'),
        (28, 'Grilled'),
        (28, 'Veggie'),
        (29, 'Beans'),
        (29, 'Salad'),
        (29, 'Seafood'),
        (30, 'Beans'),
        (30, 'Meatless'),
        (30, 'Side'),
        (30, 'Sheet Pan'),
        (30, 'Veggie'),
        (31, 'Beans'),
        (31, 'Soup/Stew'),
        (31, 'Veggie'),
        (32, 'Breakfast'),
        (32, 'Meatless'),
        (32, 'Veggie'),
        (33, 'Asian'),
        (33, 'Beef'),
        (33, 'Rice'),
        (33, 'Stirfry'),
        (34, 'Meatless'),
        (34, 'Side'),
        (34, 'Sheet Pan'),
        (34, 'Veggie'),
        (35, 'Meatless'),
        (35, 'Side'),
        (35, 'Sheet Pan'),
        (35, 'Veggie'),
        (36, 'Rice'),
        (36, 'Seafood'),
        (36, 'Sheet Pan'),
        (37, 'Breakfast'),
        (37, 'Grains'),
        (37, 'Meatless'),
        (37, 'Veggie'),
        (38, 'Breakfast'),
        (38, 'Meatless'),
        (38, 'Skillet'),
        (38, 'Veggie'),
        (39, 'Pasta'),
        (39, 'Side'),
        (39, 'Slow Cooker'),
        (40, 'Beans'),
        (40, 'Breakfast'),
        (40, 'Grains'),
        (40, 'Meatless'),
        (41, 'Seafood'),
        (41, 'Skillet'),
        (41, 'Veggie'),
        (42, 'Pasta'),
        (42, 'Seafood'),
        (42, 'Skillet'),
        (43, 'Breakfast'),
        (43, 'Meatless'),
        (43, 'Mexican'),
        (44, 'Pasta'),
        (44, 'Seafood'),
        (44, 'Skillet'),
        (45, 'Chicken'),
        (45, 'Skillet'),
        (45, 'Veggie'),
        (46, 'Grains'),
        (46, 'Seafood'),
        (46, 'Veggie'),
        (47, 'Asian'),
        (47, 'Pork'),
        (47, 'Skillet'),
        (48, 'Breakfast'),
        (48, 'Fruit'),
        (48, 'Griddle'),
        (48, 'Meatless'),
        (49, 'Asian'),
        (49, 'Seafood'),
        (49, 'Stirfry'),
        (50, 'Asian'),
        (50, 'Seafood'),
        (50, 'Stirfry'),
        (50, 'Veggie'),
        (51, 'Baked Good'),
        (51, 'Italian'),
        (51, 'Meatless'),
        (52, 'Asian'),
        (52, 'Rice'),
        (52, 'Seafood'),
        (52, 'Sheet Pan'),
        (53, 'Meatless'),
        (53, 'Pasta'),
        (53, 'Veggie'),
        (54, 'Beans'),
        (54, 'Pork'),
        (54, 'Veggie'),
        (55, 'Grains'),
        (55, 'Pork'),
        (55, 'Veggie'),
        (55, 'Skillet'),
        (56, 'Chicken'),
        (56, 'Mexican'),
        (56, 'Skillet'),
        (57, 'Chicken'),
        (57, 'Sheet Pan'),
        (57, 'Veggie'),
        (58, 'Chicken'),
        (58, 'Fruit'),
        (58, 'Salad'),
        (58, 'Veggie'),
        (59, 'Asian'),
        (59, 'Chicken'),
        (59, 'Stirfry'),
        (59, 'Veggie'),
        (60, 'Asian'),
        (60, 'Chicken'),
        (60, 'Stirfry'),
        (61, 'Chicken'),
        (61, 'Skillet'),
        (61, 'Soup/Stew'),
        (62, 'Chicken'),
        (62, 'Skillet'),
        (62, 'Veggie'),
        (63, 'Breakfast'),
        (63, 'Meatless'),
        (63, 'Mexican'),
        (63, 'Skillet'),
        (64, 'Chicken'),
        (64, 'Italian'),
        (64, 'Sheet Pan'),
        (65, 'Beans'),
        (65, 'Meatless'),
        (65, 'Mexican'),
        (65, 'Rice'),
        (65, 'Veggie'),
        (66, 'Meatless'),
        (66, 'Mexican'),
        (66, 'Sheet Pan'),
        (66, 'Veggie'),
        (67, 'Chicken'),
        (67, 'Sheet Pan'),
        (67, 'Veggie'),
        (68, 'Asian'),
        (68, 'Chicken'),
        (68, 'Stirfry'),
        (69, 'Chicken'),
        (69, 'Mexican'),
        (69, 'Veggie'),
        (70, 'Asian'),
        (70, 'Chicken'),
        (70, 'Veggie'),
        (71, 'Asian'),
        (71, 'Chicken'),
        (71, 'Skillet'),
        (71, 'Veggie'),
        (72, 'Beans'),
        (72, 'Italian'),
        (72, 'Pasta'),
        (73, 'Beans'),
        (73, 'Grains'),
        (73, 'Side'),
        (73, 'Slow Cooker'),
        (74, 'Beef'),
        (74, 'Italian'),
        (74, 'Pasta'),
        (74, 'Pork'),
        (75, 'Pork'),
        (75, 'Scandinavian'),
        (75, 'Sheet Pan'),
        (76, 'Breakfast'),
        (76, 'Griddle'),
        (76, 'Meatless'),
        (77, 'Baked Good'),
        (77, 'Breakfast'),
        (77, 'Meatless'),
        (78, 'Baked Good'),
        (78, 'Breakfast'),
        (78, 'Meatless'),
        (79, 'Breakfast'),
        (79, 'Griddle'),
        (79, 'Meatless'),
        (80, 'Breakfast'),
        (80, 'Griddle'),
        (80, 'Meatless'),
        (81, 'Breakfast'),
        (81, 'Pork'),
        (81, 'Sandwich'),
        (82, 'Beans'),
        (82, 'Breakfast'),
        (82, 'Meatless'),
        (82, 'Mexican'),
        (83, 'Beans'),
        (83, 'Breakfast'),
        (83, 'Meatless'),
        (83, 'Mexican'),
        (84, 'Beef'),
        (84, 'Grilled'),
        (85, 'Chicken'),
        (85, 'Grilled'),
        (86, 'Pork'),
        (86, 'Grilled'),
        (87, 'Fruit'),
        (87, 'Mexican'),
        (87, 'Seafood'),
        (88, 'Chicken'),
        (88, 'Italian'),
        (88, 'Skillet'),
        (89, 'Italian'),
        (89, 'Pasta'),
        (89, 'Seafood'),
        (90, 'Chicken'),
        (90, 'Italian'),
        (90, 'Pork'),
        (91, 'Beans'),
        (91, 'Meatless'),
        (91, 'Sheet Pan'),
        (91, 'Veggie'),
        (92, 'Chicken'),
        (92, 'Grains'),
        (92, 'Veggie'),
        (92, 'Skillet'),
        (93, 'Chicken'),
        (93, 'Pasta'),
        (93, 'Veggie'),
        (94, 'Mexican'),
        (94, 'Seafood'),
        (94, 'Sheet Pan'),
        (95, 'Mexican'),
        (95, 'Seafood'),
        (95, 'Veggie'),
        (96, 'Grains'),
        (96, 'Meatless'),
        (96, 'Side'),
        (96, 'Sheet Pan'),
        (96, 'Veggie'),
        (97, 'Grains'),
        (97, 'Meatless'),
        (97, 'Veggie'),
        (98, 'Asian'),
        (98, 'Chicken'),
        (98, 'Sheet Pan'),
        (98, 'Veggie'),
        (99, 'Chicken'),
        (99, 'Mexican'),
        (99, 'Skillet'),
        (100, 'Meatless'),
        (100, 'Mediterranean'),
        (100, 'Pasta'),
        (100, 'Salad'),
        (100, 'Side'),
        (101, 'Meatless'),
        (101, 'Side'),
        (101, 'Sheet Pan'),
        (101, 'Veggie'),
        (102, 'Chicken'),
        (102, 'Pasta'),
        (102, 'Veggie'),
        (103, 'Chicken'),
        (103, 'Skillet'),
        (103, 'Veggie'),
        (104, 'Beans'),
        (104, 'Grains'),
        (104, 'Meatless'),
        (104, 'Salad'),
        (104, 'Veggie'),
        (105, 'Chicken'),
        (105, 'Sheet Pan'),
        (105, 'Veggie'),
        (106, 'Meatless'),
        (106, 'Pasta'),
        (106, 'Sheet Pan'),
        (106, 'Veggie'),
        (107, 'Grains'),
        (107, 'Meatless'),
        (107, 'Salad'),
        (107, 'Veggie'),
        (108, 'Chicken'),
        (108, 'Salad'),
        (108, 'Veggie');

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
        ('2024-06-09', 63),
        ('2024-06-10', 12),
        ('2024-06-11', NULL),
        ('2024-06-12', 77),
        ('2024-06-13', 20),
        ('2024-06-14', NULL),
        ('2024-06-15', 51),
        ('2024-06-16', 79),
        ('2024-06-17', 7),
        ('2024-06-18', NULL),
        ('2024-06-19', 78),
        ('2024-06-20', 30),
        ('2024-06-21', NULL),
        ('2024-06-22', NULL),
        ('2024-06-23', 49),
        ('2024-06-24', 19),
        ('2024-06-25', 2),
        ('2024-06-26', NULL),
        ('2024-06-27', 77),
        ('2024-06-28', 53),
        ('2024-06-29', NULL),
        ('2024-06-30', NULL),
        ('2024-07-01', NULL),
        ('2024-07-02', NULL),
        ('2024-07-03', NULL),
        ('2024-07-04', NULL),
        ('2024-07-05', NULL),
        ('2024-07-06', NULL),
        ('2024-07-07', NULL),
        ('2024-07-08', NULL),
        ('2024-07-09', NULL),
        ('2024-07-10', NULL),
        ('2024-07-11', NULL),
        ('2024-07-12', NULL),
        ('2024-07-13', NULL),
        ('2024-07-14', 78),
        ('2024-07-15', 71),
        ('2024-07-16', 84),
        ('2024-07-17', NULL),
        ('2024-07-18', 43),
        ('2024-07-19', NULL),
        ('2024-07-20', 45);