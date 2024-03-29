const { UserModel,
    projectAssignmentModel,
    timesheetModel,
    projectModel,
    feedbackModel } = require('../model/mongo_models');

function ConvertTimesheetFormat(timesheet){
    formatted_timesheet = {};
    let i = 0;
    for (let i = 0;i<timesheet.length;i++){
        formatted_timesheet[timesheet[i].UID] = timesheet[i];
    }

    return (formatted_timesheet);
}

async function RetreiveProjectName(projects) {
    const formattedProjectNames = [];

    for (let i = 0; i < projects.length; i++) {
        try {
            const PID =  projects[i].PID;
            const project = await projectModel.findOne({ PID: PID });
            if (project) {
                formattedProjectNames.push({PID:PID,name:project.name});
            } else {
                // Handle case where project with given PID is not found
                formattedProjectNames.push({PID:"not found"});
            }
        } catch (error) {
            // Handle error in case of any issues with the findOne operation
            console.error(`Error retrieving project with PID ${projects[i].PID}:`, error);
            formattedProjectNames[projects[i].PID] = "Error retrieving project";
        }
    }

    console.log(formattedProjectNames);
    return formattedProjectNames;
}


module.exports = {
    ConvertTimesheetFormat,
    RetreiveProjectName
}