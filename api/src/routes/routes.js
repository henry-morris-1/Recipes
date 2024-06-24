const express = require('express');
const router = express.Router();

/////////////////////////
/** CALENDAR ENDPOINTS */
/////////////////////////
const calendarRoutes = require('./calendar/calendarRoutes');
router.use('/calendar', calendarRoutes);

////////////////////
/** TAG ENDPOINTS */
////////////////////
const tagRoutes = require('./tags/tagRoutes');
router.use('/tags', tagRoutes);

///////////////////////
/** RECIPE ENDPOINTS */
///////////////////////
const recipeRoutes = require('./recipes/recipeRoutes');
router.use('/recipes', recipeRoutes);

/** Export routes */
module.exports = router;