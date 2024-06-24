/** Set up the router */
const express = require('express');
const router = express.Router();

/** Import tag DAO */
const tagDAO = require('../../db/DAOs/tagDAO');

/**
 * Get all tags
 */
router.get('/', (req, res) => {
    tagDAO.getTags().then(tags => {
        if (tags) {
            res.status(200).json(tags);
        } else {
            res.status(404).json({ error: 'No tags found' });
        }
    })
});

module.exports = router;