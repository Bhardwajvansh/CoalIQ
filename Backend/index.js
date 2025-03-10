const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require('./models/user');
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieparser = require("cookie-parser")

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieparser())

mongoose.connect(process.env.MONGODB)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json("Token not available");
    }
    jwt.verify(token, "jwt-key", (err, decoded) => {
        if (err) {
            return res.status(401).json("Invalid or expired token");
        }
        req.user = decoded;
        next();
    });
};

app.get("/", verifyUser, (req, res) => {
    return res.status(200).json("Success");
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json("User not found. Please sign up.");
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json("Incorrect password. Please try again.");
        const token = jwt.sign({ email: user.email }, "jwt-key", { expiresIn: "1d" });
        res.cookie("token", token);
        res.status(200).json("Login successful");
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json("Server error. Please try again later.");
    }
});


app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json("Email already exists");
        const hash = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({ name, email, password: hash });
        res.status(201).json("User registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error signing up");
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
