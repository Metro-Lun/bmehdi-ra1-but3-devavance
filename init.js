import { User } from "./models/user.model.js";
import * as bcrypt from 'bcrypt';

export default async function init() {
    let adminExists = await User.findOne({email: "admin@node.js"}) === null;
    
    if(adminExists) {
        bcrypt.hash(process.env.ADMIN_PASSWORD, 12, async (err, hashedPassword) => {
            if(err) throw err;

            try {
                await User.create({
                    name: "admin",
                    email: "admin@node.js",
                    password: hashedPassword,
                    role: "admin"
                });
            } catch(err) {
                console.error(err);
            }
        });
    }
}