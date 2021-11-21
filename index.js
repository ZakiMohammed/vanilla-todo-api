const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 3000;

const app = express();

// for enabling cors policy
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('<h1>🍨 Vanilla Todo API</h1>');
})

// users
app.use('/api/users', require('./api/users'));

// todos
app.use('/api/todos', require('./api/todos'));

// mock-todos
app.use('/api/mock-todos', require('./api/mock-todos'));

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})