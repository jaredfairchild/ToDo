require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const db = require('./db');
const tasks = require("./routes/tasks")

db();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", tasks);

const port = 8080;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));