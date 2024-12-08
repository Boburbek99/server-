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
