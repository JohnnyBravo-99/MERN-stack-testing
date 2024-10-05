import pkg from "bcryptjs";
const { hashSync, compareSync } = pkg;  

import jwt from "jsonwebtoken";
const { sign } = jwt;

import User from "../models/user.model.js";

// Log the JWT secret to verify it's being loaded correctly
console.log("JWT Secret:", process.env.SECRET);

export const signup = (req, res) => {
    console.log("Signup request received:", req.body);  // Log the request body
    const user = new User({
        username: req.body.username,
        password: hashSync(req.body.password, 8),
        email: req.body.email,
    });

    user.save()
        .then(data => {
            res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
            console.error("Error during signup: ", err);  // Added logging
            res.status(500).send({ message: err.message });
        });
};

export const login = (req, res) => {
    console.log("Login request received:", req.body);  // Log the request body

    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                console.log("User not found:", req.body.username);  // Log if user is not found
                return res.status(404).send({ message: "User not found." });
            }
            const passwordIsValid = compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                console.log("Incorrect password for user:", req.body.username);  // Log if password is incorrect
                return res.status(401).send({ accessToken: null, message: "Incorrect password!" });
            }

            // Check if user is active, if this field exists
            if (user.isActive !== undefined && !user.isActive) {
                return res.status(403).send({ message: "User account is not active." });
            }

            const token = sign({ id: user._id }, process.env.SECRET, {
                expiresIn: 86400 // 24 hours
            });

            console.log("Login successful for user:", req.body.username);  // Log successful login
            res.status(200).send({
                id: user._id,
                username: user.username,
                accessToken: token
            });
        })
        .catch(err => {
            console.error("Error during login: ", err);  // Log any errors
            res.status(500).send({ message: err.message });
        });
};
