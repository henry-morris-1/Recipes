/** Set up the router */
const express = require("express");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

/** Import recipe DAO */
const calendarDAO = require("../../db/DAOs/calendarDAO");

/**
 * Get all recipes
 */
router.get("/", (req, res) => {
    calendarDAO.getCalendar().then(calendar => {
        if (calendar) {
            res.status(200).json(calendar);
        } else {
            res.status(404).json({ error: "Calendar not found" });
        }
    });
});

/**
 * Add new empty days to the calendar
 */
router.post("/", (req, res) => {
    const newDays = req.body;

    calendarDAO.postCalendar(newDays).then(calendar => {
        if (calendar) {
            res.status(200).json(calendar);
        } else {
            res.status(404).json({ error: "Error updating calendar" });
        }
    });
})

/**
 * Put a new version of the calendar in
 */
router.put("/", (req, res) => {
    const calendar = req.body;

    calendarDAO.putCalendar(calendar).then(calendar => {
        if (calendar) {
            res.status(200).json(calendar);
        } else {
            res.status(404).json({ error: "Error updating calendar" });
        }
    });
});

module.exports = router;