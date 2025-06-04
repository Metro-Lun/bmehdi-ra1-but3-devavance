import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'A user must have a name'], trim: true},
    email: { type: String, required: [true, 'A user must have an email address'], trim: true},
    password: { type: String, required: [true, 'A user must have a password'], minLength: 8, trim: true},
    role: { type: String, default: "user", enum: ["user", "admin", "moderator"], trim: true},
});

const User = mongoose.model('User', userSchema);

export { User }