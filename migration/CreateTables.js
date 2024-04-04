async function CreateTables(conn){
    conn.execute({
        sqlText: 'USE DATABASE timely'
    });

    conn.execute({
        
        sqlText: 'CREATE TABLE IF NOT EXISTS raw.feedback_histories (id VARCHAR(255) PRIMARY KEY, PID VARCHAR(255), email VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, start_period TIMESTAMP, end_period TIMESTAMP, feedback_given TEXT)',
        complete: function(err, stmt, rows) {
            if (err) {
                console.error('Failed to execute statement due to the following error: ' + err.message);
            } else {
                console.log('Successfully executed statement: ' + stmt.getSqlText());
            }
        }
    });

    conn.execute({
        
        sqlText: 'CREATE TABLE IF NOT EXISTS raw.feedbacks (id VARCHAR(255) PRIMARY KEY, PID VARCHAR(255), email VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, start_period TIMESTAMP, end_period TIMESTAMP, comments TEXT, role VARCHAR(255), q1 INT, q2 INT, q3 INT, q4 INT, q5 INT, q6 INT, q7 INT,q8 INT)',
        complete: function(err, stmt, rows) {
            if (err) {
                console.error('Failed to execute statement due to the following error: ' + err.message);
            } else {
                console.log('Successfully executed statement: ' + stmt.getSqlText());
            }
        }
    });
    
    conn.execute({
        
        sqlText: 'CREATE TABLE IF NOT EXISTS raw.projectAssignments (id VARCHAR(255) PRIMARY KEY, PID INT, email VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, allocation_start TIMESTAMP, allocation_end TIMESTAMP)',
        complete: function(err, stmt, rows) {
            if (err) {
                console.error('Failed to execute statement due to the following error: ' + err.message);
            } else {
                console.log('Successfully executed statement: ' + stmt.getSqlText());
            }
        }
    });
    
    conn.execute({
        
        sqlText: 'CREATE TABLE IF NOT EXISTS raw.projects (id VARCHAR(255) PRIMARY KEY, PID INT, name VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, start_period TIMESTAMP, end_period TIMESTAMP)',
        complete: function(err, stmt, rows) {
            if (err) {
                console.error('Failed to execute statement due to the following error: ' + err.message);
            } else {
                console.log('Successfully executed statement: ' + stmt.getSqlText());
            }
        }
    });
    
    conn.execute({
        
        sqlText: 'CREATE TABLE IF NOT EXISTS raw.timesheets (id VARCHAR(255) PRIMARY KEY, PID INT, email VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, start_period TIMESTAMP, end_period TIMESTAMP, mon INT,tue INT, wed INT, thur INT, fri INT, sat INT, sun INT)',
        complete: function(err, stmt, rows) {
            if (err) {
                console.error('Failed to execute statement due to the following error: ' + err.message);
            } else {
                console.log('Successfully executed statement: ' + stmt.getSqlText());
            }
        }
    });
    
    conn.execute({
        
        sqlText: 'CREATE TABLE IF NOT EXISTS raw.users (id VARCHAR(255) PRIMARY KEY, first_name VARCHAR(255), email VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, last_name VARCHAR(255), role VARCHAR(255))',
        complete: function(err, stmt, rows) {
            if (err) {
                console.error('Failed to execute statement due to the following error: ' + err.message);
            } else {
                console.log('Successfully executed statement: ' + stmt.getSqlText());
            }
        }
    });
    
}

module.exports = {
    CreateTables
}