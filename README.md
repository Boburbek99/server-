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
   

