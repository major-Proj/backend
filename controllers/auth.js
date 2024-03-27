const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const db = require('../db/connect');

const login = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        const user = await data.find(u => { return u.username === username && u.password === password });
        res.json(result.rows);
      } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving users');
      }
};

const test = async (req,res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
      } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving users');
      }
}

module.exports = {
    login,
    test
}