const mongodb = require('../db/connect.js');
const { UserModel, timesheetModel, feedbackHistoryModel } = require('../model/mongo_models');
const { CheckTimesheets } = require('../utils/mail_utils.js');
const {CreateConnection} = require('../db/connect_snowflake.js')
const { CreateTables } = require('../migration/CreateTables.js');
const { MigrateData } = require('../migration/MigrateData.js');

async function SendReminderMail() {

    const today = new Date();
    const todayDay = today.getDay();

    if (todayDay === 0) {
        try {
            const users = await UserModel.find();

            for (let i = 0; i < users.length; i++) {
                user = users[i].email
                console.log(user)
                await CheckTimesheets(user)
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    } else {
        console.log("skipping mail dispatch!")
    }
}

async function Migration(){
    conn = await CreateConnection();
    try{
        await CreateTables(conn);
        await MigrateData(conn);
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    SendReminderMail,
    Migration
}