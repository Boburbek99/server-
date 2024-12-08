api/user.js
В представленном коде реализован маршрутизатор для работы с пользователями на основе Express.js.
1. Импорт и настройка маршрутизатора:

   import express from "express";
   let router = express.Router();
   import { usersQuery } from "../model/user.js";
   
Здесь происходит импорт библиотеки express и создание экземпляра маршрутизатора. Также импортируется модуль usersQuery, который, содержит функции для работы с данными пользователей в базе данных.

2. Создание пользователя:

   router.post('/users', async (req, res) => {
       try {
           const { userId, name, about } = req.body;
           const userData = await usersQuery.addUser(userId, name, about);
           res.status(200).send(userData);
       } catch {
           res.status(500).json();
       }
   });
   
3. Получение информации о пользователе по ID:

   router.get('/users/:userId', async (req, res) => {
       try {
           const userData = await usersQuery.findUserById(req.params.userId);
           if (!userData) {
               res.status(404).send('Пользователь не найдень!');
           } else {
               res.status(200).send(userData);
               console.log(userData);
           }
       } catch (error) {
           res.status(500).json(error);
       }
   });

4. Редактирование имени пользователя:

      router.patch('/users/:userId', async (req, res) => {
       try {
           const { name } = req.body;
           const userData = await usersQuery.findUserById(req.params.userId, name);
           if (!userData) {
               res.status(404).send('Пользователь не найдень!');
           } else {
               res.status(200).send(userData);
               console.log(userData);
           }
       } catch (error) {
           res.status(500).json(error);
       }
   });
   
model/user.js

В представленном коде создается модель пользователя с использованием библиотеки Mongoose для работы с MongoDB. 

import mongoose from "mongoose";
import md5 from "md5";
const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: String,
    about: String,
});
const User = mongoose.model('User', UserSchema);

const usersQuery = { addUser, findUserById };

async function addUser(userId, name, about) {
    const userData = new User({ userId: userId, name: name, about: about })
    await userData.save();
    return { md5Hash: md5(userId) }
}
async function findUserById(userId, userName) {
    const userData = await User.findOneAndUpdate({ userId: userId }, { name: userName }, { new: true })
    return userData;
}

export { usersQuery, User }

services/expressRouters
В данном коде происходит инициализация маршрутов для приложения на Node.js с использованием Express:
import user from "../api/user.js";
export function initializeRoutes(app) {
    app.use((req, res, next) => {
        console.log(`${req.method} Request ${req.path}`);
        next();
    })
    app.use(user);
}


