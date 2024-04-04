var snowflake = require('snowflake-sdk');

async function CreateConnection() {
    const sf_connection = snowflake.createConnection({
        account: 'QFTWANW-PB48829',
        username: 'ARJUNJMAN',
        password: '',
        application: 'Timely'
    });

    try {
        await new Promise((resolve, reject) => {
            sf_connection.connect((err, conn) => {
                if (err) {
                    console.error('Unable to connect to Snowflake:', err.message);
                    reject(err);
                } else {
                    console.log('Successfully connected to Snowflake.');
                    resolve(conn);
                }
            });
        });
        
        const isConnectionValid = await sf_connection.isValidAsync();
        console.log('Snowflake connection is valid:', isConnectionValid);
    } catch (error) {
        console.error('Error connecting to Snowflake:', error);
    }
    
    

    return sf_connection

    
}

module.exports = {
    CreateConnection
}