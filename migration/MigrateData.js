const { UserModel,
    projectAssignmentModel,
    timesheetModel,
    projectModel,
    feedbackModel,
    feedbackHistoryModel } = require('../model/mongo_models');


async function MigrateUsers(conn) {
    console.log("migrating users")
    try {
        conn.execute({
            sqlText: 'USE DATABASE timely'
        });

        const allUsers = await UserModel.find();
        const batchSize = 20;
        const totalItems = allUsers.length;
        let processedCount = 0;

        while (processedCount < totalItems) {
            const batch = allUsers.slice(processedCount, processedCount + batchSize);
            console.log("users migrated:",processedCount + batchSize)
            for (let i = 0; i < batch.length; i++) {
                item = batch[i]
                await conn.execute({
                    sqlText: `MERGE INTO raw.users AS target 
                              USING (SELECT ?, ?, ?, ?, ?, ?) AS source (id, first_name, last_name, email, role, created_at)
                              ON target.id = source.id
                              WHEN MATCHED THEN
                                  UPDATE SET 
                                      target.first_name = source.first_name,
                                      target.last_name = source.last_name,
                                      target.email = source.email,
                                      target.role = source.role,
                                      target.created_at = source.created_at
                              WHEN NOT MATCHED THEN
                                  INSERT (id, first_name, last_name, email, role, created_at)
                                  VALUES (source.id, source.first_name, source.last_name, source.email, source.role, source.created_at)`,
                    binds: [item.id, item.first_name, item.last_name, item.email, item.role, item.created_at],
                    complete: function (err, stmt, rows) {
                        if (err) {
                            console.error('Failed to execute statement:', err.message);
                        }
                    }
                });

            }
            await new Promise(resolve => setTimeout(resolve, 15000));
            processedCount += batchSize
        }

    } catch (error) {
        console.log(error)
    }

}

async function MigrateTimesheets(conn) {
    console.log("migrating timesheets")
    try {
        conn.execute({
            sqlText: 'USE DATABASE timely'
        });

        const allTimesheets = await timesheetModel.find();
        const batchSize = 20;
        const totalItems = allTimesheets.length;
        let processedCount = 0;



        while (processedCount < totalItems) {
            const batch = allTimesheets.slice(processedCount, processedCount + batchSize);
            console.log("timesheets migrated:",processedCount + batchSize)
            for (let i = 0; i < batch.length; i++) {
                item = batch[i]
                await conn.execute({
                    sqlText: `MERGE INTO TIMELY.RAW.TIMESHEETS AS target 
                              USING (SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) AS source (ID, PID, EMAIL, CREATED_AT, START_PERIOD, END_PERIOD, MON, TUE, WED, THUR, FRI, SAT, SUN, VISIBLE, SUBMITTED)
                              ON target.ID = source.ID
                              WHEN MATCHED THEN
                                  UPDATE SET 
                                      target.PID = source.PID,
                                      target.EMAIL = source.EMAIL,
                                      target.CREATED_AT = source.CREATED_AT,
                                      target.START_PERIOD = source.START_PERIOD,
                                      target.END_PERIOD = source.END_PERIOD,
                                      target.MON = source.MON,
                                      target.TUE = source.TUE,
                                      target.WED = source.WED,
                                      target.THUR = source.THUR,
                                      target.FRI = source.FRI,
                                      target.SAT = source.SAT,
                                      target.SUN = source.SUN,
                                      target.VISIBLE = source.VISIBLE,
                                      target.SUBMITTED = source.SUBMITTED
                              WHEN NOT MATCHED THEN
                                  INSERT (ID, PID, EMAIL, CREATED_AT, START_PERIOD, END_PERIOD, MON, TUE, WED, THUR, FRI, SAT, SUN, VISIBLE, SUBMITTED)
                                  VALUES (source.ID, source.PID, source.EMAIL, source.CREATED_AT, source.START_PERIOD, source.END_PERIOD, source.MON, source.TUE, source.WED, source.THUR, source.FRI, source.SAT, source.SUN, source.VISIBLE, source.SUBMITTED)`,
                    binds: [item.UID, item.PID, item.email, item.created_at, item.start_period, item.end_period, item.mon, item.tue, item.wed, item.thur, item.fri, item.sat, item.sun, item.visible, item.submitted],
                    complete: function (err, stmt, rows) {
                        if (err) {
                            console.error('Failed to execute statement:', err.message);
                        }
                    }
                });
            }
            await new Promise(resolve => setTimeout(resolve, 15000));
            processedCount += batchSize

        }

    } catch (error) {
        console.log(error)
    }

}

async function MigrateProjects(conn) {
    console.log("migrating projects")
    try {
        conn.execute({
            sqlText: 'USE DATABASE timely'
        });

        const allProjects = await projectModel.find();
        const batchSize = 20; // Define the batch size
        const totalItems = allProjects.length;
        let processedCount = 0;

        // Process projects in batches
        while (processedCount < totalItems) {
            const batch = allProjects.slice(processedCount, processedCount + batchSize);
            console.log("projects migrated:",processedCount + batchSize);

            // Process each project in the batch
            for (let i = 0; i < batch.length; i++) {
                const item = batch[i];
                await conn.execute({
                    sqlText: `MERGE INTO TIMELY.RAW.PROJECTS AS target
                              USING (SELECT ?, ?, ?, ?, ?,?,?) AS source (ID,PID,CLIENT_NAME,NAME, START_PERIOD, END_PERIOD,CREATED_AT)
                              ON target.ID = source.ID
                              WHEN MATCHED THEN
                                  UPDATE SET 
                                      target.PID = source.PID,
                                      target.NAME = source.NAME,
                                      target.START_PERIOD = source.START_PERIOD,
                                      target.END_PERIOD = source.END_PERIOD,
                                      target.CLIENT_NAME = source.CLIENT_NAME
                              WHEN NOT MATCHED THEN
                                  INSERT (ID, PID, CLIENT_NAME,NAME, START_PERIOD, END_PERIOD,CREATED_AT)
                                  VALUES (source.ID, source.PID, source.CLIENT_NAME ,source.NAME, source.START_PERIOD, source.END_PERIOD, source.CREATED_AT)`,
                    binds: [item.id, item.PID, item.client_name, item.name, item.start, item.end, item.created_at],
                    complete: function (err, stmt, rows) {
                        if (err) {
                            console.error('Failed to execute statement:', err.message);
                        }
                    }
                });
            }

            // Pause execution for a specified duration between batches
            await new Promise(resolve => setTimeout(resolve, 15000)); // 15 seconds pause

            processedCount += batchSize;
        }

    } catch (error) {
        console.log(error)
    }
}


async function MigrateProjectAllocation(conn) {
    console.log("migrating project allocation")
    try {
        conn.execute({
            sqlText: 'USE DATABASE timely'
        });

        const allProjectAllocation = await projectAssignmentModel.find();
        const batchSize = 20; // Define the batch size
        const totalItems = allProjectAllocation.length;
        let processedCount = 0;

        // Process project allocations in batches
        while (processedCount < totalItems) {
            const batch = allProjectAllocation.slice(processedCount, processedCount + batchSize);
            console.log("Allocation migrated:",processedCount + batchSize);

            // Process each project allocation in the batch
            for (let i = 0; i < batch.length; i++) {
                const item = batch[i];
                await conn.execute({
                    sqlText: `MERGE INTO TIMELY.RAW.PROJECTASSIGNMENTS AS target
                              USING (SELECT ?, ?, ?, ?, ?, ?) AS source (ID, PID, EMAIL, CREATED_AT, ALLOCATION_START, ALLOCATION_END)
                              ON target.ID = source.ID
                              WHEN MATCHED THEN
                                  UPDATE SET 
                                      target.PID = source.PID,
                                      target.EMAIL = source.EMAIL,
                                      target.CREATED_AT = source.CREATED_AT,
                                      target.ALLOCATION_START = source.ALLOCATION_START,
                                      target.ALLOCATION_END = source.ALLOCATION_END
                              WHEN NOT MATCHED THEN
                                  INSERT (ID, PID, EMAIL, CREATED_AT, ALLOCATION_START, ALLOCATION_END)
                                  VALUES (source.ID, source.PID, source.EMAIL, source.CREATED_AT, source.ALLOCATION_START, source.ALLOCATION_END)`,
                    binds: [item.id, item.PID, item.email, item.created_at, item.allocation_start, item.allocation_end],
                    complete: function (err, stmt, rows) {
                        if (err) {
                            console.error('Failed to execute statement:', err.message);
                        }
                    }
                });
            }

            // Pause execution for a specified duration between batches
            await new Promise(resolve => setTimeout(resolve, 15000)); // 15 seconds pause

            processedCount += batchSize;
        }

    } catch (error) {
        console.log(error)
    }
}

async function MigrateFeedback(conn) {
    console.log("migrating feedback")
    try {
        conn.execute({
            sqlText: 'USE DATABASE timely'
        });

        const allFeedbacks = await feedbackModel.find();
        const batchSize = 20; // Define the batch size
        const totalItems = allFeedbacks.length;
        let processedCount = 0;

        // Process feedbacks in batches
        while (processedCount < totalItems) {
            const batch = allFeedbacks.slice(processedCount, processedCount + batchSize);
            console.log("feedbacks migrated:",processedCount + batchSize);

            // Process each feedback in the batch
            for (let i = 0; i < batch.length; i++) {
                const item = batch[i];
                await conn.execute({
                    sqlText: `MERGE INTO TIMELY.RAW.FEEDBACKS AS target
                              USING (SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) AS source (ID, PID, EMAIL, CREATED_AT, START_PERIOD, END_PERIOD, COMMENTS, ROLE, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8)
                              ON target.ID = source.ID
                              WHEN MATCHED THEN
                                  UPDATE SET 
                                      target.PID = source.PID,
                                      target.EMAIL = source.EMAIL,
                                      target.CREATED_AT = source.CREATED_AT,
                                      target.START_PERIOD = source.START_PERIOD,
                                      target.END_PERIOD = source.END_PERIOD,
                                      target.COMMENTS = source.COMMENTS,
                                      target.ROLE = source.ROLE,
                                      target.Q1 = source.Q1,
                                      target.Q2 = source.Q2,
                                      target.Q3 = source.Q3,
                                      target.Q4 = source.Q4,
                                      target.Q5 = source.Q5,
                                      target.Q6 = source.Q6,
                                      target.Q7 = source.Q7,
                                      target.Q8 = source.Q8
                              WHEN NOT MATCHED THEN
                                  INSERT (ID, PID, EMAIL, CREATED_AT, START_PERIOD, END_PERIOD, COMMENTS, ROLE, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8)
                                  VALUES (source.ID, source.PID, source.EMAIL, source.CREATED_AT, source.START_PERIOD, source.END_PERIOD, source.COMMENTS, source.ROLE, source.Q1, source.Q2, source.Q3, source.Q4, source.Q5, source.Q6, source.Q7, source.Q8)`,
                    binds: [item.id, item.PID, item.email, item.created_at, item.start_period, item.end_period, item.comments, item.role, item.q1, item.q2, item.q3, item.q4, item.q5, item.q6, item.q7, item.q8], // Bind values from your data
                    complete: function (err, stmt, rows) {
                        if (err) {
                            console.error('Failed to execute statement:', err.message);
                        }
                    }
                });
            }

            // Pause execution for a specified duration between batches
            await new Promise(resolve => setTimeout(resolve, 15000)); // 15 seconds pause

            processedCount += batchSize;
        }

    } catch (error) {
        console.log(error)
    }
}


async function MigrateFeedbackHistory(conn) {
    console.log("migrating feedback history")
    try {
        conn.execute({
            sqlText: 'USE DATABASE timely'
        });

        const allFeedbackHistories = await feedbackHistoryModel.find();
        const batchSize = 20; // Define the batch size
        const totalItems = allFeedbackHistories.length;
        let processedCount = 0;

        // Process feedback history in batches
        while (processedCount < totalItems) {
            const batch = allFeedbackHistories.slice(processedCount, processedCount + batchSize);
            console.log("feedback history migrated:",processedCount + batchSize);

            // Process each feedback history in the batch
            for (let i = 0; i < batch.length; i++) {
                const item = batch[i];
                await conn.execute({
                    sqlText: `MERGE INTO TIMELY.RAW.FEEDBACK_HISTORIES AS target
                              USING (SELECT ?, ?, ?, ?, ?, ?, ?) AS source (ID, PID, EMAIL, CREATED_AT, START_PERIOD, END_PERIOD, FEEDBACK_GIVEN)
                              ON target.ID = source.ID
                              WHEN MATCHED THEN
                                  UPDATE SET 
                                      target.PID = source.PID,
                                      target.EMAIL = source.EMAIL,
                                      target.CREATED_AT = source.CREATED_AT,
                                      target.START_PERIOD = source.START_PERIOD,
                                      target.END_PERIOD = source.END_PERIOD,
                                      target.FEEDBACK_GIVEN = source.FEEDBACK_GIVEN
                              WHEN NOT MATCHED THEN
                                  INSERT (ID, PID, EMAIL, CREATED_AT, START_PERIOD, END_PERIOD, FEEDBACK_GIVEN)
                                  VALUES (source.ID, source.PID, source.EMAIL, source.CREATED_AT, source.START_PERIOD, source.END_PERIOD, source.FEEDBACK_GIVEN)`,
                    binds: [item.id, item.PID, item.email, item.created_at, item.start_period, item.end_period, item.feedback_given], // Bind values from your data
                    complete: function (err, stmt, rows) {
                        if (err) {
                            console.error('Failed to execute statement:', err.message);
                        }
                    }
                });
            }

            // Pause execution for a specified duration between batches
            await new Promise(resolve => setTimeout(resolve, 15000)); // 15 seconds pause

            processedCount += batchSize;
        }
    } catch (error) {
        console.log(error)
    }
}


async function MigrateData(conn) {
    console.log("Migration of data started")
    try {
        MigrateUsers(conn)
        MigrateTimesheets(conn)
        MigrateProjects(conn)
        MigrateProjectAllocation(conn)
        MigrateFeedback(conn)
        MigrateFeedbackHistory(conn)
        console.log("migration succussfull")
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    MigrateData
}