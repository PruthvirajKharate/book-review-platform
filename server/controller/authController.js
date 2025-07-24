const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

exports.signup = async (req, res) =>{
    try{
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already in use"});
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });
        res.status(201).json({message: "User registered successfully", user: newUser});
    }catch(error){
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

exports.login = async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid credentials"});
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(400).json({Message: "Invalid credentials"});

        const token = jwt.sign({ id: user._id, username: user.username}, process.env.JWT_SECRET , {expiresIn: '1h'});
        res.status(200).json({message: "Login successful" , token, userame: user.username}); 
    }catch(error){
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}