const users = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register logic
exports.registerController = async (req, res) => {
    console.log("Inside registerController");
    const { firstname, lastname, email, password } = req.body; // Removed username
    console.log(firstname, lastname, email, password);

    // Check if the email is present in MongoDB
    try {
        const existingUser = await users.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            // User already exists
            return res.status(406).json("Account already exists! Please login.");
        } else {
            const newUser = new users({
                
                firstname,
                lastname,
                email,
                password, 
            });

            await newUser.save();
            res.status(200).json({ 
                message: "Registration successful!",
                user: { 
                    _id: newUser._id,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email 
                   
                }
            });
        }
    } catch (err) {
        console.error("Error in registerController:", err);
        res.status(500).json({ error: "An error occurred during registration." });
    }
};

// Login logic
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    // Get user details from req body 
    const { email, password } = req.body;
    console.log(email, password);

    // Check email & password in user model
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            // Check if the provided password matches
            if (existingUser.password === password) { // Directly comparing passwords
                // Generate token using JWT
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD);
                res.status(200).json({
                    user: {
                        _id: existingUser._id,
                        email: existingUser.email,
                        firstname: existingUser.firstname,
                        lastname: existingUser.lastname,
                    },
                    token,
                });
            } else {
                // Incorrect password
                return res.status(404).json("Invalid email or password");
            }
        } else {
            // User not found
            return res.status(404).json("Invalid email or password");
        }
    } catch (err) {
        console.error("Error in loginController:", err);
        res.status(500).json({ error: "An error occurred during login." });
    }
};

// Get user details based on token-provided userId
exports.getUserController = async (req, res) => {
    console.log("Inside getUserController");
    try {
        const userId = req.userId; 
        const user = await users.findById(userId).select('-password'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            userid: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        });
    } catch (error) {
        console.error("Error in getUserController:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
