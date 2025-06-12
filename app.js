import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import qs from "qs";
import cookieParser from 'cookie-parser';
import { readFileSync } from 'node:fs';

import { tourRouter } from './routes/tours.routes.js';
import { userRouter } from './routes/users.routes.js';
import init from './init.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
const router = express.Router();
const port = process.env.PORT || 3000;

app.set("query parser", str => qs.parse(str));

const connectString = `mongodb+srv://mehdibourbon:${process.env.PASSWORD}@clusterdevavance.khbavt1.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDevAvance`
mongoose.connect(connectString)
    .then(() => {
        console.log("Connection to MongoDB succeeded");
    })
    .catch((err) => {
        console.error("Connection to MongoDB failed : ", err);
    });

router.get('/', (req, res) => {
    res.send("Hello from the server")
});

router.get('/overview', (req, res) => {
    const overview = readFileSync("./public/overview.html", "utf-8");
    res.send(overview);
})

app.use(router);
app.listen(port, () => {
    console.log(`App running on port ${port}`)
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

init();

export { app }