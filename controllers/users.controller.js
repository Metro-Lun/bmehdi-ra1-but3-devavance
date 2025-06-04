import UserService from "../services/users.service.js";

const us = new UserService();

export const getAllUsers = (req, res) => {
    const users = us.getUsers();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: { users }
    });
}

export const addUser = (req, res) => {
    const valid = us.middleware(req.body)

    if(valid) {
        users.push(req.body);
        us.writeUsersInFile();
        res.status(200).json({
            status: "success"
        });
    } else {
        res.status(500).json({
            status: "error"
        });
    }
}

export const getUserById = (req, res) => {
    const user = us.findUserById(req.params.id);
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
    const valid = us.changeUserPut(req.params.id, req.body);

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
    const valid = us.deleteUserFromFile(req.params.id);

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