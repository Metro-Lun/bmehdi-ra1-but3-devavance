import mongoose from 'mongoose';
import { readFileSync } from 'node:fs'
import dotenv from "dotenv"
import { Tour } from './models/tour.model.js';

dotenv.config()

const connectString = `mongodb+srv://mehdibourbon:${process.env.PASSWORD}@clusterdevavance.khbavt1.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDevAvance`
await mongoose.connect(connectString)
    .then(() => {
        console.log("Connection to MongoDB succeeded");
    })
    .catch((err) => {
        console.error("Connection to MongoDB failed : ", err);
    });

let filename = "dev-data/data/tours.json"
let tours = JSON.parse(readFileSync(filename, "utf-8"));

try {
    if(process.argv[2] === "--import") {
        let newTours = await Tour.create(tours)
            .then(() => {
                console.log("Insertion succeeded")
            })
            .catch((err) => {
                console.error("Insertion failed", err)
            });
    } else if(process.argv[2] === "--delete") {
        let oldTours = await Tour.deleteMany()
            .then(() => {
                console.log("Deletion succeeded")
            })
            .catch((err) => {
                console.error("Deletion failed", err)
            });
    }
}
catch(err) {
    console.log("erreur : ", err)
}

await mongoose.disconnect();
