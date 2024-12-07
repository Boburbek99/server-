import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: String,
    about: String,
});

const User = mongoose.model('User', UserSchema);
const usersQuery = { addUser };

async function addUser(userInfo) {
    const userData = new User(userInfo)
    return userData.save();
}

export { usersQuery, User }
