const express = require('express')
const mongodb = require('mongodb');

const router = express.Router();

// local
// const connectionString = 'mongodb://localhost:27017';

// production
const connectionString = 'mongodb+srv://admin:admin@cluster0.jrthw.mongodb.net/test';

const client = new mongodb.MongoClient(connectionString);
const dbName = 'todo-db';

// /api/todos/

// get all
router.get('/', async (req, res) => {
    try {
        await client.connect();

        const collection = client.db(dbName).collection('tasks');
        const data = await collection.find({}).toArray();
        const tasks = data.reverse();

        res.json(tasks);

    } catch (error) {
        res.status(500).json(error);
    }
})

// get single
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await client.connect();

        const collection = client.db(dbName).collection('tasks');
        const task = await collection.findOne({ '_id': mongodb.ObjectId(id) });

        res.json(task);

    } catch (error) {
        res.status(500).json(error);
    }
})

// create
router.post('/', async (req, res) => {
    try {
        const task = req.body;

        await client.connect();

        const collection = client.db(dbName).collection('tasks');
        const result = await collection.insertOne(task);

        if (result.acknowledged) {
            task._id = result.insertedId;
            res.status(201).json(task);
        } else {
            res.status(500).json({
                message: 'Record not inserted'
            });
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

// update
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const task = req.body;

        await client.connect();

        delete task._id;    // must be removed

        const collection = client.db(dbName).collection('tasks');
        const result = await collection.updateOne(
            { '_id': mongodb.ObjectId(id) }, 
            { $set: task }, 
            { upsert: true }
        );

        if (result.acknowledged && (result.modifiedCount || result.upsertedCount)) {
            task._id = id;
            res.json(task);
        } else {
            res.status(500).json({
                message: 'Record not updated'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// delete
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await client.connect();

        const collection = client.db(dbName).collection('tasks');
        const result = await collection.deleteOne({ '_id': mongodb.ObjectId(id) });

        if (result.acknowledged && result.deletedCount) {
            res.json({});
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// delete
router.delete('/', async (req, res) => {
    try {
        const id = req.params.id;

        await client.connect();

        const collection = client.db(dbName).collection('tasks');
        const result = await collection.deleteMany({});

        if (result.acknowledged && result.deletedCount) {
            res.json({});
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
