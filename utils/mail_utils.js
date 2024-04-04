const { transporter } = require('../utils/auth_utils');
const { UserModel,timesheetModel, feedbackHistoryModel } = require('../model/mongo_models');

function formatDate (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return (`${year}-${month}-${day}`);
}

async function CheckTimesheets(user){
    const today = new Date();
    const dayOfWeek = today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? 0 : 7));

    const formattedDateSunday = formatDate(sunday);
    const formattedDateMonday = formatDate(monday);

    let startdate = '2024-01-29';
    let enddate = '2024-02-04';
    let stopCondition = true;
    
    const unfilled = [];
    const unfilled_feedbacks = [];

    const unfilledFeedbacks = await feedbackHistoryModel.find(
        {
            email:user,
            feedback_given:false
        }
    )
    
    if(unfilledFeedbacks){
        for(let i=0;i<unfilledFeedbacks.length;i++){
            const start = unfilledFeedbacks[i].start_period
            const end = unfilledFeedbacks[i].end_period
            
            unfilled_feedbacks.push(`${formatDate(start)} - ${formatDate(end)}`)
        }
    }
    

    while(stopCondition){

        nextStartDate = new Date(startdate);
        nextEndDate = new Date(enddate);
        const timesheetFill = await timesheetModel.findOne(
            {
                email:user,
                submitted:true,
                start_period:startdate,
                end_period:enddate,
            }
        )


        if(!timesheetFill){
            unfilled.push(`${startdate} - ${enddate}`)
        }


        if (startdate===formattedDateMonday && enddate===formattedDateSunday){
            stopCondition = false
        };

        nextStartDate.setDate(nextStartDate.getDate() + 7);
        nextEndDate.setDate(nextEndDate.getDate() + 7);

        startdate = formatDate(nextStartDate);
        enddate = formatDate(nextEndDate);
        
    }

    let mailOptions = {
        from: 'aiarjun027@gmail.com',
        to: user,
        subject: 'Reminder: Please Fill Out Your Feedback and Timesheets',
        html: `
            <p>Dear User,</p>
            <p>We hope this email finds you well.</p>
            <p>We noticed that you haven't yet filled out your feedback and timesheets for the following periods:</p>
            ${unfilled_feedbacks?(`<p><strong>Unfilled Feedbacks:</strong></p>`):("")}
            <ul>
                ${unfilled_feedbacks.map(period => `<li>Period: ${period}</li>`).join('')}
            </ul>
            ${unfilled?(`<p><strong>Unfilled Timesheets:</strong></p>`):("")}
            <ul>
                ${unfilled.map(period => `<li>Period: ${period}</li>`).join('')}
            </ul>
            <p>To ensure accurate reporting and effective management of projects, it's important that you complete your feedback and timesheets in a timely manner.</p>
            <p>Please take a moment to fill out the necessary forms for the mentioned periods at your earliest convenience. Your cooperation in this matter is greatly appreciated.</p>
            <p>If you encounter any difficulties or have any questions, please don't hesitate to reach out to us.</p>
            <p>Thank you for your attention to this matter.</p>
            <p>Best regards,<br>Timely</p>
        `
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
    
}

module.exports = {
    CheckTimesheets
}