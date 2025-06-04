import { readFileSync, writeFileSync } from 'node:fs'

export default class TourService {

    constructor() {
        this.filename = "dev-data/data/tours-simple.json"
        this.tours = JSON.parse(readFileSync(this.filename, "utf-8"));
    }

    middleware(body) {  
        const fields = ["id", "name", "duration", "description", "difficulty", "maxGroupSize"];

        for (let f of fields) {
            if(!body.hasOwnProperty(f)) return false;
        }
        return true;
    }

    changeTourPut(id, body) {
        const tour = findTourById(id)

        if(tour) {
            for(let field of Object.keys(body)) {
                tour[field] = body[field];
            }
            writeToursInFile(this.filename);
            return true;
        }
        return false;
    }

    findTourById(id) {
        for (let t of tours) {
            if(t.id == id) return t;
        }
        return null;
    }

    writeToursInFile() {
        const success = writeFileSync(this.filename, JSON.stringify(tours), "utf-8")
    }

    deleteTourFromFile(id) {
        const tour = findTourById(id);

        if(tour) {
            const index = tours.indexOf(tour);
            tours.splice(index, 1);

            writeToursInFile(this.filename);
            return true;
        }

        return false;
    }

    getTours() {
        return this.tours;
    }
}