const db = require("../DBConnection");
const Day = require("../models/Day");

function getCalendar () {
    return db.query("SELECT date, recipe_id, recipe_name FROM calendar LEFT JOIN recipes ON calendar.recipe_id_fk = recipes.recipe_id ORDER BY date").then(({results}) => {
        return results.map(day => new Day(day));
    });
}

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
    postCalendar: postCalendar,
    putCalendar: putCalendar
};