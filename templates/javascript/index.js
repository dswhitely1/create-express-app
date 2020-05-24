require('dotenv').config()
const express = require('express')
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use([helmet(), express.urlencoded({extended: true}), express.json(), cors()])

app.get('/', (req, res) => {
    res.json({message: `It's Alive`})
})

app.listen(port, () => console.log(`Server listening on PORT:${port}`))