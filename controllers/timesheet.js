const { UserModel,
    projectAssignmentModel,
    timesheetModel,
    projectModel,
    feedbackModel,
    feedbackHistoryModel } = require('../model/mongo_models');

const {ConvertTimesheetFormat,RetreiveProjectName} = require('../utils/timesheet_utils')

const RertreiveTimesheetPerWeek = async (req,res) => {
    try {


        const user = req.user.email;
        const { startPeriod , endPeriod } = req.body;
        const timeSheetdata = await timesheetModel.find({
            email:user,
            start_period:startPeriod,
            end_period:endPeriod,
            visible:true
        })

        if(timeSheetdata.length !== 0) {
            
            res.json({ message: "Timesheet data sent", payload: ConvertTimesheetFormat(timeSheetdata) });
        }
        else {
            const newTimeSheet = new timesheetModel({
                UID: Math.floor(100000 + Math.random() * 900000).toString(),
                email: user,
                PID: "", // Assuming PID is empty initially
                activity: "",
                comments:"",
                start_period: startPeriod, // Example start date
                end_period: endPeriod, // Example end date
                mon: 0,
                tue: 0,
                wed: 0,
                thur: 0,
                fri: 0,
                sat: 0,
                sun: 0,
                created_at: new Date()
            });
            
            try {
                const result = await newTimeSheet.save();
                console.log(result); 
                res.json({ message: "Timesheet data sent", payload: ConvertTimesheetFormat([result]) });
            } catch (error) {
                console.error(error);
            }

        }
    } catch (error) {
        console.log(error);
        res.json({"message": "unable to retreive timesheet data"});
    }
}

const RetreiveUserProject = async (req,res) => {
    try {
        const userproject = await projectAssignmentModel.find({
            email:req.user.email
        });

    
        if(userproject.length !== 0) {
            
            res.json({ message: "Project sent", payload: await RetreiveProjectName(userproject)});
        }
        else{
            res.json({ message: "Project sent", payload: [{PID:"0",name:"bench"}]});
        }
    }
    catch{
        console.log(error);
        res.json({"message": "unable to retreive project data"});
    }
}

const CreateUpdateTimesheets = async (req, res) => {
    try {
        const data = req.body;

        for (const [key, value] of Object.entries(data)) {
            const existingTimesheet = await timesheetModel.findOne({
                UID: value.UID,
                email: value.email, 
                start_period: value.start_period,
                end_period: value.end_period
            });

            if (existingTimesheet) {
                await timesheetModel.updateOne({
                    UID: value.UID,
                    email: value.email,
                    start_period: value.start_period,
                    end_period: value.end_period
                }, {
                    $set: value
                });
                console.log(`Timesheet entry updated for UID ${value.UID}`);
            } else {
                const newTimesheet = new timesheetModel(value);
                await newTimesheet.save();
                console.log(`New timesheet entry created for UID ${value.UID}`);
            }
        }

        res.status(200).json({ message: "Timesheets created/updated successfully" });
    } catch (error) {
        console.error('Error creating/updating timesheets:', error);
        res.status(500).json({ message: 'Error creating/updating timesheets' });
    }
};


module.exports ={
    RertreiveTimesheetPerWeek,
    RetreiveUserProject,
    CreateUpdateTimesheets
}