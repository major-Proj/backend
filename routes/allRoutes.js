const { Router } = require('express'); 
const utils = require('../utils/utils')

const router = Router();

const AuthControllers = require('../controllers/auth');

//main apis
router.post('/login',AuthControllers.login);
router.get('/test',AuthControllers.test)

module.exports = router;