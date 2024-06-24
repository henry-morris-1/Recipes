const express = require("express");
const router = express.Router();

////////////////////////////////////
/** USER AUTHENTICATION ENDPOINTS */
////////////////////////////////////
const authRoutes = require("./auth/authRoutes");
router.use("/", authRoutes);

/////////////////////////
/** CALENDAR ENDPOINTS */
/////////////////////////
const calendarRoutes = require("./calendar/calendarRoutes");
router.use("/calendar", calendarRoutes);

///////////////////////
/** RECIPE ENDPOINTS */
///////////////////////
const recipeRoutes = require("./recipes/recipeRoutes");
router.use("/recipes", recipeRoutes);

////////////////////
/** TAG ENDPOINTS */
////////////////////
const tagRoutes = require("./tags/tagRoutes");
router.use("/tags", tagRoutes);

/** Export routes */
module.exports = router;