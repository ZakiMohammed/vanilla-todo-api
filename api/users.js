const express = require('express')
const router = express.Router();

const users = [
    { id: 1, username: 'john' },
    { id: 2, username: 'allen' },
    { id: 3, username: 'smith' },
];

// get all
router.get('/', (req, res) => {
    res.json(users);
})

// get single
router.get('/:id', (req, res) => {

    // req -> input
    // res -> output

    const id = +req.params.id;
    const user = users.find(i => i.id === id);

    res.json(user || null);
})

module.exports = router;
