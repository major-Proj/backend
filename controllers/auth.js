const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const login = async (req, res) => {
    console.log("hi")
};

const test = async (req,res) => {
    console.log("hei")
}

module.exports = {
    login,
    test
}