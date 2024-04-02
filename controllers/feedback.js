const { UserModel,
    projectAssignmentModel,
    timesheetModel,
    projectModel,
    feedbackModel,
    feedbackHistoryModel } = require('../model/mongo_models');


const CreateFeedbackEntry = async (req, res) => {

    try {

        const email = req.user.email;
        const role = req.user.role;
        const { PID, start_period, end_period, feedback } = req.body;

        console.log(req.body);

        const newFeedback = new feedbackModel({
            email: email,
            PID: PID,
            role: role,
            start_period: start_period, // Example start date
            end_period: end_period, // Example end date
            q1: feedback['q1'],
            q2: feedback['q2'],
            q3: feedback['q3'],
            q4: feedback['q4'],
            q5: feedback['q5'],
            q6: feedback['q6'],
            q7: feedback['q7'],
            q8: feedback['q8'],
            comments: feedback['comments'],
            created_at: new Date()
        });

        try {
            const result = await newFeedback.save();
            console.log(result);
            res.json({ message: "Feedback data saved" });
        } catch (error) {
            console.error(error);
        }

    } catch (error) {
        console.log(error);
        res.json({ "message": "unable to create feedback entry" })
    }
}

const feedbackGiven = async (req, res) => {

    try {
        const email = req.user.email;
        const { start_period, end_period, PID, feedback_given } = req.body;
        console.log(req.body);

        const existingFeedbackHistory = await feedbackHistoryModel.findOne({
            email: email,
            PID: PID,
            start_period: start_period,
            end_period: end_period
        });

        if (existingFeedbackHistory) {
            await feedbackHistoryModel.updateOne({
                email: email,
                PID: PID,
                start_period: start_period,
                end_period: end_period
            }, {
                $set: { feedback_given:feedback_given  }
            });
            res.json({ "message": "feedback history updated!" })
            console.log(`Feedback entry updated for PID ${PID}`);
        } else {
            const newFeedbackHistory = new feedbackHistoryModel({
                email: email,
                PID: PID,
                start_period: start_period,
                end_period: end_period,
                feedback_given:feedback_given
            });
            await newFeedbackHistory.save();
            res.json({ "message": "feedback history updated!" })
            console.log(`New feedback entry created for PID ${PID}`);
        }
    } catch (error) {
        console.log(error);
        res.json({ "message": "feedback history not updated" })
    }
}

const RetreiveUnfilledFeedbacks = async(req,res) => {

    try {
        const feedbackhistory = await feedbackHistoryModel.find({
            email:req.user.email,
            feedback_given:false
        })

        const projects = await projectModel.find()
        
        res.json({"message":"Feedback data sent","payload":feedbackhistory,"projects":projects})
    } catch (error) {
        console.log(error);
        res.json({"message":"error retreiving feedback history"})
    }

}
    module.exports = {
        CreateFeedbackEntry,
        feedbackGiven,
        RetreiveUnfilledFeedbacks
    }
