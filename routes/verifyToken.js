const jwt = require('jsonwebtoken');
const { nextTick } = require('vue/types/umd');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.verifyToken;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if(err) res.status(403).json("Token is not vaid!");
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated")
    }
}


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken (req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } 
    });
};


module.exports = { verifyToken, verifyTokenAndAuthorization};