const express = require('express')
const router = express.Router();

// mock database
const tasks = [
    { id: 1, title: 'Buy coffee' },
    { id: 2, title: 'Work on code' },
    { id: 3, title: 'Buy some more coffee' },
];

// /api/todos/

// get all
router.get('/', (req, res) => {
    res.json(tasks);
})

// get single
router.get('/:id', (req, res) => {

    const id = +req.params.id;
    const task = tasks.find(i => i.id === id);

    res.json(task || null);
})

// create
router.post('/', (req, res) => {

    const task = req.body;

    task.id = tasks.length + 1;

    tasks.push(task);

    res.status(201).json(task);
})

// update
router.put('/:id', (req, res) => {
    const id = +req.params.id;
    const task = req.body;

    const index = tasks.findIndex(i => i.id === id);

    tasks[index] = task;

    res.json(task);
})

// delete
router.delete('/:id', (req, res) => {

    const id = +req.params.id;
    const index = tasks.findIndex(i => i.id === id);

    if (index !== -1) {
        tasks.splice(index, 1);

        res.json();
    } else {
        res.status(404).json({
            message: 'Record not found'
        });
    }
})

module.exports = router;
