const { Router } = require('express'); 
const utils = require('../utils/auth_utils')

const router = Router();

const AuthControllers = require('../controllers/auth');
const AdminControllers = require('../controllers/admin_controls')
const TimesheetControllers = require('../controllers/timesheet')
const FeedbackControllers = require('../controllers/feedback')
const DashboardControllers = require('../controllers/dashboard')


//main apis
router.get('/test',AuthControllers.test);
router.post('/login',AuthControllers.login);
router.post('/registerUser',utils.authenticateJWT,utils.authorizationCheck,AuthControllers.register_user);
router.post('/generateOtp',AuthControllers.generate_otp);
router.post('/changePassword',AuthControllers.change_password);
router.post('/userDetail',AuthControllers.user_detail);
router.post('/createProject',utils.authenticateJWT,utils.authorizationCheck,AdminControllers.create_project)
router.get('/getUsersProjects',utils.authenticateJWT,utils.authorizationCheck,AdminControllers.getUsersProjects)
router.post('/allocateProject',utils.authenticateJWT,utils.authorizationCheck,AdminControllers.allocate_project)
router.post('/getTimesheetData',utils.authenticateJWT,TimesheetControllers.RertreiveTimesheetPerWeek)
router.get('/getUserProject',utils.authenticateJWT,TimesheetControllers.RetreiveUserProject)
router.post('/CreateUpdateTimesheets',utils.authenticateJWT,TimesheetControllers.CreateUpdateTimesheets)
router.post('/CreateFeedback',utils.authenticateJWT,FeedbackControllers.CreateFeedbackEntry)
router.post('/FeedbackHistory',utils.authenticateJWT,FeedbackControllers.feedbackGiven)
router.get('/Unfilledfeedbacks',utils.authenticateJWT,FeedbackControllers.RetreiveUnfilledFeedbacks)
router.get('/dashboard',utils.authenticateJWT,DashboardControllers.HomePageDash)
router.post('/AllFeedbacks',utils.authenticateJWT,utils.authorizationCheck,FeedbackControllers.RetreiveAllFeedbacks)

module.exports = router;