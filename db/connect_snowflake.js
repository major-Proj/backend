var snowflake = require('snowflake-sdk');

async function CreateConnection() {
    const sf_connection = snowflake.createConnection({
        account: 'QFTWANW-PB48829',
        username: '',
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

        if (isConnectionValid){
            console.log('Snowflake connected to execute queries');
            return sf_connection
        } else {
            console.log('Snowflake not connected to excute queries')
            return 
        }
        
    } catch (error) {
        console.error('Error connecting to Snowflake:', error);
    }
    

    
}

module.exports = {
    CreateConnection
}
