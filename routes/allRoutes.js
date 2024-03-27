const { Router } = require('express'); 
const utils = require('../utils/utils')

const router = Router();

const AuthControllers = require('../controllers/auth');

//main apis
router.get('/test',AuthControllers.test);
router.post('/login',AuthControllers.login);
router.post('/registerUser',utils.authenticateJWT,AuthControllers.register_user);
router.post('/generateOtp',AuthControllers.generate_otp);
router.post('/changePassword',AuthControllers.change_password);
module.exports = router;