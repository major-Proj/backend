const { Router } = require('express'); 
const utils = require('../utils/utils')

const router = Router();

const AuthControllers = require('../controllers/auth');
const AdminControllers = require('../controllers/admin_controls')

//main apis
router.get('/test',AuthControllers.test);
router.post('/login',AuthControllers.login);
router.post('/registerUser',utils.authenticateJWT,AuthControllers.register_user);
router.post('/generateOtp',AuthControllers.generate_otp);
router.post('/changePassword',AuthControllers.change_password);
router.post('/userDetail',AuthControllers.user_detail);
router.post('/createProject',utils.authenticateJWT,AdminControllers.create_project)
router.get('/getUsersProjects',utils.authenticateJWT,AdminControllers.getUsersProjects)
router.post('/allocateProject',utils.authenticateJWT,AdminControllers.allocate_project)

module.exports = router;