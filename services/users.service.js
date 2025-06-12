import { readFileSync, writeFileSync } from "node:fs"

export default class UserService {
    constructor() {
        this.filename = "dev-data/data/users.json"
        this.users = JSON.parse(readFileSync(this.filename, "utf-8"));
    }

    getUsers() {
        return this.users;
    }

    middleware(body) {
        const fields = ["name", "email", "password"];

        for (let f of fields) {
            if(!body.hasOwnProperty(f)) return false;
        }

        return true;
    }

    changeUserPut(id, body) {
        const tour = findUserById(id)

        if(tour) {
            for(let field of Object.keys(body)) {
                tour[field] = body[field];
            }
            writeUsersInFile(this.filename);
            return true;
        }
        return false;
    }

    findUserById(id) {
        for (let u of users) {
            if(u._id == id) return t;
        }
        return null;
    }

    writeUsersInFile() {
        const success = writeFileSync(this.filename, JSON.stringify(users), "utf-8")
    }

    deleteUserFromFile(id) {
        const tour = this.findUserById(id);

        if(tour) {
            const index = users.indexOf(tour);
            users.splice(index, 1);

            this.writeUsersInFile(this.filename);
            return true;
        }

        return false;
    }

    checkRole(role) {
        // renvoyer une page de non-accès
    }
}