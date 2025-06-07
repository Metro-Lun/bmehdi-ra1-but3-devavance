import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { User } from '../models/user.model.js';

const saltRounds = 12;

export const signup = async (req, res) => {
    try {
        const password = req.body.password;
        if(password.length < 8) throw new Error("Password must be at least 8 characters long");
        
        bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
            if(err) throw err;

            try {
                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    role: req.body.role
                });

                res.status(201).send("User registered successfully");
            } catch(err) {
                res.status(500).send("mail")
            }
        });
    }
    catch(err) {
        res.status(500).json({
            status: "error",
            message: err
        });
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        if(user !== null) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result) {
                    const token = jwt.sign({
                        data: {
                            userId: user._id,
                            role: user.role
                        }
                    }, process.env.SECRET_KEY, { expiresIn: '24h' });

                    res.cookie("token", token, {
                        secure: true,
                        sameSite: "strict",
                        maxAge: 60 * 60 * 24,
                    });

                    res.status(500).send("Token generated successfully")              
                } 
                else res.status(400).send("token error in login");
            });
        } 
        else res.status(404).send("not found");
    }
    catch(err) {
        res.status(500).json({
            status: "error",
            message: err
        });
    }
}

export const verifyToken = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (token == null) return res.status(401).send(req.headers['authorization']);

        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if (err) return res.status(401).json(err);

            console.log(data)
            res.send(data);
        });
    }
    catch(err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
}