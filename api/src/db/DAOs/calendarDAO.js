const db = require("../DBConnection");
const Day = require("../models/Day");

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
    return db.query("SELECT date, recipe_id, recipe_name FROM calendar LEFT JOIN recipes ON calendar.recipe_id_fk = recipes.recipe_id ORDER BY date").then(({results}) => {
        return results.map(day => new Day(day));
    });
}

/**
 * Gets the entire calendar from the database with full recipe objects.
 * @returns Calendar
 */
function getCalendarWithTags () {
    return db.query("SELECT date, recipe_id, recipe_name FROM calendar LEFT JOIN recipes ON calendar.recipe_id_fk = recipes.recipe_id ORDER BY date").then(({results}) => {
        return recipeTagHelper(results.map(day => new Day(day)));
    });
}

/**
 * Adds the given dates to the calendar with null recipes
 * @param {Array} newDays Array of datestrings to add
 * @returns Entire calendar
 */
function postCalendar (newDays) {
    const promises = [];

    newDays.forEach(day => {
        promises.push(db.query("INSERT IGNORE INTO calendar (date, recipe_id_fk) VALUES (?, NULL)", [day]).then(() => {
            return;
        }));
    });

    return Promise.all(promises).then(() => {
        return getCalendar();
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