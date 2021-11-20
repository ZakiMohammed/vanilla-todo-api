# API for Vanilla Todo Application

Creating API for our Vanilla Todo Application

Run Command:
```
nodemon index
node index
```

Initial Setup:
```
npm i dotenv
npm i nodemon
npm i express
npm i mongodb
```

Initial Code:
```
const express = require('express')

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Vanilla Todo API</h1>');
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})
```