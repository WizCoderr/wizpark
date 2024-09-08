import { Router } from "express";
import { getAllUsers, login, signUp } from "../controllers/AddUser.controller";

const user = Router()

user.post('/signup',signUp)
user.post('/login',login)
user.get('/getUsers',getAllUsers)

export default user