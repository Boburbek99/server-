import express from "express";
let router = express.Router();
import { usersQuery } from "../model/user.js";
router.post('/users', async (req, res) => {
    try {
        const user = req.body;
        const userData = await usersQuery.addUser(user)
        res.status(200).send(userData)
    }
    catch {
        res.status(500).json({ error: err.message });
    }
})
export default router;
