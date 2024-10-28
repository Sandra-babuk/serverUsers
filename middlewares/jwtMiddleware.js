const jwt = require('jsonwebtoken');

// middleware
const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwtMiddleware");

    // get token from the 'Authorization' header
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log(token);

    // verify token
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWT_PASSWORD);
            console.log(jwtResponse);
            req.userId = jwtResponse.userId;
            next();
        } catch (error) {
            console.error("JWT Verification Error:", error);
            res.status(401).json("Please login to proceed... Authentication failed.");
        }
    } else {
        res.status(406).json("Authentication failed... token missing");
    }
};

module.exports = jwtMiddleware;
