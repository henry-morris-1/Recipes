const db = require("../DBConnection");
const Day = require("../models/Day");

/**
 * Automatically adds days to the calendar to ensure at least a week out from the current
 * date is included.
 */
function addDaysHelper () {
    // Get today's date and a target a week out
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const target = new Date(new Date().setDate(today.getDate() + 7));

    return db.query("SELECT date FROM calendar ORDER BY date DESC LIMIT 1").then(({results}) => {
        const lastDay = new Date(results[0].date);

        // If the target isn't in the calendar or is the last day, add more days
        if (target.getTime() >= lastDay.getTime()) {
            const days = []; // Keep an array of the days to add

            // Loop until the target is included
            while (lastDay <= target) {
                // Add a week at a time
                for (let d = 0; d < 7; d++) {
                    lastDay.setDate(lastDay.getDate() + 1); // Increment by a day
                    days.push(lastDay.toISOString().split("T")[0]); // Put the string in the array
                }
            }

            // Add the days
            if (days.length > 0) {
                return postCalendar(days);
            }
        } else {
            return;
        }
    });
}

/**
 * Adds the tags for the recipe of the given day
 * @param {Array} days Days to add tags to
 * @returns Days with tags
 */
function recipeTagHelper (days) {
    // Create a list of promises
    const promises = [];

    // Get each day's recipe's tags, adding the promise to the array
    days.forEach(day => {
        promises.push(db.query("SELECT tag_name_fk FROM recipe_tags WHERE recipe_id_fk = ?", [day.recipeId]).then(({results}) => {
            day.tags = [];
            results.forEach(tag => {
                day.tags.push(tag.tag_name_fk);
            });
        }));
    });

    // Return the days once they"ve all resolved
    return Promise.all(promises).then(() => {
        return days;
    });
}

/**
 * Gets the entire calendar from the database.
 * @returns Calendar
 */
function getCalendar () {
    return addDaysHelper().then(() => {
        return db.query("SELECT date, recipe_id, recipe_name FROM calendar LEFT JOIN recipes ON calendar.recipe_id_fk = recipes.recipe_id ORDER BY date").then(({results}) => {
            return results.map(day => new Day(day));
        });
    });
}

/**
 * Gets the entire calendar from the database with full recipe objects.
 * @returns Calendar
 */
function getCalendarWithTags () {
    return addDaysHelper().then(() => {
        return db.query("SELECT date, recipe_id, recipe_name FROM calendar LEFT JOIN recipes ON calendar.recipe_id_fk = recipes.recipe_id ORDER BY date").then(({results}) => {
            return recipeTagHelper(results.map(day => new Day(day)));
        });
    });
}

/**
 * Adds the given dates to the calendar with null recipes
 * @param {Array} newDays Array of datestrings to add
 */
function postCalendar (newDays) {
    const promises = [];

    newDays.forEach(day => {
        promises.push(db.query("INSERT IGNORE INTO calendar (date, recipe_id_fk) VALUES (?, NULL)", [day]).then(() => {
            return;
        }));
    });

    return Promise.all(promises).then(() => {
        return;
    });
}

/**
 * Updates the recipe IDs for the given dates.
 * @param {Array} calendar Array of date, recipe ID pairs to set in the calendar
 * @returns Entire calendar
 */
function putCalendar (calendar) {
    const promises = [];

    calendar.forEach(day => {
        promises.push(db.query("UPDATE calendar SET recipe_id_fk = ? WHERE date = ?", [day.recipeId, day.date.substring(0, 10)]).then(() => {
            return;
        }));
    });

    return Promise.all(promises).then(() => {
        return getCalendar();
    });
}

module.exports = {
    getCalendar: getCalendar,
    getCalendarWithTags: getCalendarWithTags,
    postCalendar: postCalendar,
    putCalendar: putCalendar
};