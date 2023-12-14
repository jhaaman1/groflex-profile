import mongoose from "mongoose";

export const User = new mongoose.model("user", new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, },
    password: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    dob: { type: Date, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    interest: [],
    profilePicture: {
        name: { type: String },
        docBase: { type: String },
        doctype: { type: String },
    },

}), 'User');