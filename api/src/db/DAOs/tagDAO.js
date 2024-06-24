const db = require('../DBConnection');

function getTags () {
    return db.query('SELECT * FROM tags').then(({results}) => {
        return results.map(tag => tag.tag_name);
    });
}

module.exports = {
    getTags: getTags
}