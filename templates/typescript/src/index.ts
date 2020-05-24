import {config} from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

config();
const app = express()
const port = process.env.PORT || 5000

app.use([helmet(), express.urlencoded({extended: true}), express.json(), cors()]);

app.get('/', (req, res) => {
    res.json({message: `It's Alive`})
})

app.listen(port, () => console.log(`Server listening on PORT:${port}`))

