import UserService from "../services/users.service.js";
import AuthService from "../services/auth.service.js";
import { User } from "../models/user.model.js";

const userService = new UserService();
const authService = new AuthService();

export const getAllUsers = (req, res) => {
    const connectedUserData = authService.verifyToken(req, res);
    if(connectedUserData === null || !authService.checkRole(connectedUserData, "admin") || !authService.checkRole(connectedUserData, "moderator")) 
        res.status(400).send("Accès refusé : vous n'êtes ni admin ni modo !");

    const users = userService.getUsers();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: { users }
    });
}

export const addUser = (req, res) => {
    const connectedUserData = authService.verifyToken(req, res);
    if(connectedUserData === null || !authService.checkRole(connectedUserData, "admin") || !authService.checkRole(connectedUserData, "moderator")) 
        res.status(400).send("Accès refusé : vous n'êtes ni admin ni modo !");
    else {
        const valid = userService.middleware(req.body)

        if(valid) {
            if(req.body.role === "admin") {
                if(!authService.checkRole(connectedUserData, "admin"))
                    res.status(400).send("Accès refusé : seuls les admins peuvent créer des admins")
            } else {
                users.push(req.body);
                us.writeUsersInFile();
                res.status(200).json({
                    status: "success"
                });
            }
        } else {
            res.status(500).json({
                status: "error",
            });
        }
    }
}

export const getUserById = (req, res) => {
    const connectedUserData = authService.verifyToken(req, res);
    if(connectedUserData === null || !authService.checkRole(connectedUserData, "admin") || !authService.checkRole(connectedUserData, "moderator")) 
        res.status(400).send("Accès refusé : vous n'êtes ni admin ni modo !");

    const user = userService.findUserById(req.params.id);
    if(user) {
        res.status(200).json({
            status: "success",
            data: { user }
        });
    } else {
        res.status(500).json({
            status: "error"
        });
    }
}

export const modifyUserById = (req, res) => {
    const connectedUserData = authService.verifyToken(req, res);
    if(connectedUserData === null || !authService.checkRole(connectedUserData, "admin") || !authService.checkRole(connectedUserData, "moderator")) 
        res.status(400).send("Accès refusé : vous n'êtes ni admin ni modo !");

    const valid = userService.changeUserPut(req.params.id, req.body);

    if(valid) {
        res.status(204).json({
            status: "success"
        });
    } else {
        res.status(500).json({
            status: "error"
        });
    }
}

export const deleteUserById = (req, res) => {
    const connectedUserData = authService.verifyToken(req, res);
    if(connectedUserData === null || !authService.checkRole(connectedUserData, "admin") || !authService.checkRole(connectedUserData, "moderator")) 
        res.status(400).send("Accès refusé : vous n'êtes ni admin ni modo !");
    
    const valid = userService.deleteUserFromFile(req.params.id);

    if(valid) {
        res.status(204).json({
            status: "success"
        });
    } else {
        res.status(500).json({
            status: "error"
        });
    }
}