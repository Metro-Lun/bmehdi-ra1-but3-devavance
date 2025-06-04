import express from 'express'
import { getAllUsers, modifyUserById, addUser, deleteUserById, getUserById } from '../controllers/users.controller.js'

const userRouter = express.Router()

userRouter
    .route('/')
    .get(getAllUsers)
    .post(addUser)

userRouter
    .route('/:id')
    .get(getUserById)
    .put(modifyUserById)
    .delete(deleteUserById);
    
export { userRouter }