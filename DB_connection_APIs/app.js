const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = require('./Router/index');

const port = 4567;
const hostname ='localhost';
// const dbUrl = 'mongoose://127.0.0.1:27017/zomato';
const atlasDbUrl = 'mongodb+srv://zomato:sonishweta@cluster0.nkq3c.mongodb.net/zomato?retryWrites=true&w=majority';

app.use(express.json());
app.use(cors());
app.use('/',router);

mongoose.connect(atlasDbUrl, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(res => {
        app.listen(port, hostname, () => {
            console.log(`Server is running at ${hostname}:${port}`)
        });
    })
    .catch(err => console.log(err));
