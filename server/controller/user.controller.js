import pkg from 'bcryptjs'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import path from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

// import nodemailer from 'nodemailer';
const { compareSync } = pkg

export const UserController = {
    registrationuser: async (data, user) => {
        if (!data.firstName) {
            throw ({ message: "firstName Is Required" })
        }
        if (!data.lastName) {
            throw ({ message: "firstName Is Required" })
        }
        if (!data.password) {
            throw ({ message: "Password Is Required" })
        }
        if (!data.email) {
            throw ({ message: "Email Is Required" })
        }
        if (!data.country) {
            throw ({ message: "Country Is Required" })
        }
        if (!data.state) {
            throw ({ message: "State Is Required" })
        }
        if (!data.city) {
            throw ({ message: "City Is Required" })
        }
        if (!data.gender) {
            throw ({ message: "Gender Is Required" })
        }
        if (!data.dob) {
            throw ({ message: "Date Is Required" })
        }
        if (!data.zip) {
            throw ({ message: "zip code Is Required" })
        }
        if (!data.interest) {
            throw ({ message: "Area of interest Is Required" })
        }
        const existinguser = await User.findOne({ email: data.email })
        if (existinguser) {
            throw ({ code: 409, message: "Email Already Exist" })
        }
        const Passwordsalt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash(data.password, Passwordsalt);
        const newUser = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: encryptedPassword,
            gender: data.gender,
            dob: data.dob,
            country: data.country,
            state: data.state,
            city: data.city,
            zip: data.zip,
            interest: data.interest,
            profilePicture: {
                name: data.profilePicture.name,
                docBase: data.profilePicture.docBase,
                doctype: data.profilePicture.doctype,
            },
        });
        console.log(newUser)
        newUser.save().catch((err) => {
            console.error(err);
            throw { code: 500, message: "Failed to save user" };
        });

    },
    GenerateUserAccessToken: async (email, password, persist) => {

        if (!email) {
            throw { code: 400, message: "Invalid value for: User Name" };
        }
        if (!password) {
            throw { code: 400, message: "Invalid value for: password" };
        }
        const existingUser = await UserController.findUser({
            email: email,
        });
        console.log(existingUser)
        if (!existingUser) {
            throw { code: 401, message: "Invalid email or password" };
        }

        // if (existingUser.locked === false) {
        //     throw { code: 401, message: "User account is locked" };
        // }
        const passwordValid = await bcrypt.compare(password, existingUser.password);
        if (!passwordValid) {
            throw { code: 401, message: "Invalid User Name or password" };
        }

        console.log("Hashed password:", existingUser.password);


        const accessTokenResponse = {
            id: existingUser._id,
            email: existingUser.email,
            // role: existingUser.roles,
        };

        const accessToken = jwt.sign(
            accessTokenResponse,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: persist ? "1y" : "8h",
            }
        );

        return {
            email: existingUser.email,
            accessToken: accessToken,
            // role: existingUser.roles,
            // balance: existingUser.balance,
            // loadBalance: existingUser.loadBalance,
            // isActive: existingUser.isActive

        };
    },

    trashuser: async (id) => {
        try {
            const existinguser = await User.findById(id);

            if (!existinguser) {
                throw { code: 404, message: `User User not found with id: ${_id}` };
            }

            const updatedTransactionData = {
                id: existinguser._id,
                firstName: existinguser.firstName,
            };

            const backupTransaction = new User(updatedTransactionData);
            await backupTransaction.save();

            const deleteduser = await User.findByIdAndDelete(_id);

            if (!deleteduser) {
                throw { code: 500, message: `Failed to delete User with id: ${_id}` };
            }

            return true;
        } catch (error) {
            throw error;
        }
    },
    SaveResetPassword: async (email, newpassword, confirmpassword) => {
        const checkUser = await User.findOne({ email: { $regex: new RegExp(email, "i") } }).exec();
        console.log("checkUser", checkUser);
        if (!checkUser) {
            throw { code: 404, message: "User Not Found" };
        }
        const isSamePassword = await bcrypt.compare(newpassword, checkUser.password);
        if (isSamePassword) {
            throw { code: 400, message: "New password cannot b~e the same as the old password." };
        }
        if (newpassword != confirmpassword) {
            throw { code: 400, message: "Password is not matching" };
        }
        const passwordsalt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash(newpassword, passwordsalt)

        checkUser.password = encryptedPassword;
        checkUser.save().catch((err) => {
            console.error(err);
            throw { code: 500, message: "Failed to save new password" };
        });
        return true;

    },
  
    
    findUser: async (filter) => {
        if (!filter) {
            throw { code: 409, message: "Required parameter: filter" };
        }
        return User.findOne(filter).exec();
    },
}