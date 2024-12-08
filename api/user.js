import express from "express";
let router = express.Router();
import { usersQuery } from "../model/user.js";
router.post('/users', async (req, res) => {
    try {
        const { userId, name, about } = req.body;
        const userData = await usersQuery.addUser(userId, name, about)
        res.status(200).send(userData)
    }
    catch {
        res.status(500).json();
    }
})
router.get('/users/:userId', async (req, res) => {
    try {
        const userData = await usersQuery.findUserById(req.params.userId)
        if (!userData) {
            res.status(404).send('Пользователь не найдень!');
        }
        else {
            res.status(200).send(userData)
            console.log(userData)
        }
    } catch (error) {
        res.status(500).json(error);
    }
})
router.patch('/users/:userId', async (req, res) => {
    try {
        const { name } = req.body;
        const userData = await usersQuery.findUserById(req.params.userId, name)
        if (!userData) {
            res.status(404).send('Пользователь не найдень!');
        }
        else {
            res.status(200).send(userData)
            console.log(userData)
        }
    } catch (error) {
        res.status(500).json(error);
    }
})
export default router;
