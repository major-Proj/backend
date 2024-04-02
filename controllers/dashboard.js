const { UserModel,
    projectAssignmentModel,
    timesheetModel,
    projectModel,
    feedbackModel,
    feedbackHistoryModel } = require('../model/mongo_models');


const HomePageDash = async(req,res) => {
    try{
        const email = req.user.email;
        const role = req.user.role;
        console.log(email)
        const uniqueDatesTimesheets = new Set();
        const uniqueDatesFeedbacks = new Set();


        const existingFilledTimesheets = await timesheetModel.find({
            email:email, 
            submitted:true
        });

        const existingFilledFeedback = await feedbackHistoryModel.find({
            email:email,
            feedback_given:true
        })


        console.log(existingFilledFeedback);
        console.log(existingFilledTimesheets);

        for (let i=0;i<existingFilledTimesheets.length;i++){
            startDate = new Date(existingFilledTimesheets[i].start_period).toDateString()
            endDate = new Date(existingFilledTimesheets[i].end_period).toDateString()
            const week = `${startDate}-${endDate}`
            uniqueDatesTimesheets.add(week)
        }
        for (let i=0;i<existingFilledFeedback.length;i++){
            startDate = new Date(existingFilledFeedback[i].start_period).toDateString()
            endDate = new Date(existingFilledFeedback[i].end_period).toDateString()
            const week = `${startDate}-${endDate}`
            uniqueDatesFeedbacks.add(week)
        }

        console.log(uniqueDatesFeedbacks,uniqueDatesTimesheets)

        res.send({message:"dashboard data sent",payload:{timesheet:Array.from(uniqueDatesTimesheets),feedbacks:Array.from(uniqueDatesFeedbacks)}})

    } catch (error) {
        res.json({message:"error at retreiving dash!"})
        console.log(error)
    }
}

module.exports = {
    HomePageDash
}