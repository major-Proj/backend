const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const db = require('../db/connect');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'aiarjun027@gmail.com',
            pass: 'hhfm nzhs orqe jcqg',
         },
    secure: true,
    });

const login = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        const { email, password } = req.body;
        const user = await result.rows.find(u => { return u.email === email && u.password === password });

        if (user) {
            const accessToken = jwt.sign({ user_id: user.user_id, email: user.email, first_name: user.first_name, role: user.role }, accessTokenSecret);
            res.json({
                accessToken,
                role:user.role
            });
        } else {
            res.json({ message: 'Username or password incorrect' });
        }
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Error retrieving users' });
    }
};

const register_user = async (req, res) => {
    try {
        const { first_name, last_name, role, password, email, phone_number } = req.body;

        if (req.user && req.user.role === "admin") {
            const result = await db.query(
                'INSERT INTO users (first_name, last_name, role, password, email, phone_number, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [first_name, last_name, role, password, email, phone_number, new Date()]
            );

            if (result.rows.length > 0) {

                await db.query(
                    'INSERT INTO change_password (email,count) VALUES ($1, $2) RETURNING *',
                    [result.rows[0].email, 0]
                );

                const mailData = {
                    from: 'aiarjun027@gmail.com', 
                      to: result.rows[0].email,   
                      subject: 'welcome to appliation',
                      text: 'mail added',
                      html: `<b>Hey there! </b> <br> Admin has added your mail to our application<br/>`,
                    };

                transporter.sendMail(mailData, function (err, info) {
                    if(err)
                        console.log(err)
                    else
                        console.log(info);
                    });
                    
                res.json({ message: "User created successfully", user: result.rows[0] });

            } else {
                res.status(500).json({ message: "Error creating user" });
            }
        } else {
            res.status(403).json({ message: "Only admins can perform this function" });
        }
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({ message: "Error creating user" });
    }
};

const generate_otp = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await db.query('SELECT * FROM users');
        const user = await result.rows.find(u => { return u.email === email});
    
        if (user) {
            const otp = Math.floor(10000 + Math.random() * 90000).toString();
            const result = await db.query(
                'INSERT INTO temp_otp (email, otp, created_at) VALUES ($1, $2, $3) RETURNING *',
                [email, otp, new Date()]
            );

            res.json({ message: "OTP created successfully", payload: result.rows[0] });

            const mailData = {
                from: 'aiarjun027@gmail.com', 
                  to: result.rows[0].email,   
                  subject: 'OTP - please do not share dude',
                  text: 'OTP requested',
                  html: `<b>Hey there! </b> <br> your otp is ${otp}<br/>`,
                };

            transporter.sendMail(mailData, function (err, info) {
                if(err)
                    console.log(err)
                else
                    console.log(info);
                });
        } else {
            res.json({ message: "There is no email in db" })
        }

    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Error generating otp' });
    }
};

const change_password = async (req, res) => {
    try {
        const { email, new_password, otp } = req.body;

        if (email && otp) {
            const result = await db.query('SELECT * FROM temp_otp');
    
            const check_otp = await result.rows.find(u => { return u.email === email && u.otp === otp });
            if (check_otp) {
                try {
                    const result = await db.query(
                        'UPDATE users SET password = $1 WHERE email = $2 RETURNING *',
                        [new_password, email]
                    );

                    const count_ = await db.query(
                        'UPDATE change_password SET count = $1 WHERE email = $2 RETURNING *',
                        [1, email]
                    );

                    const delete_ = await db.query(
                        'DELETE FROM temp_otp WHERE email = $1 RETURNING *',
                        [email]
                    );

                    if (result.rows.length > 0) {

                        res.json({ message: "User password changed successfully", user: result.rows[0] });

                    } else {
                        res.status(500).json({ message: "Error changing password" });
                    }
                }
                catch (err) {
                    console.error('Error executing query', err);
                    res.status(500).json({ message: 'Error changing password' });
                }
            } else {
                res.json({ message: "otp not found" })
            }
        } else {
            
            res.json({ message: "There is no email or otp" })
        }

    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Error changing password' });
    }
};

const user_detail = async (req,res) => {
    res.json(req.user)
}

const test = async (req, res) => {
    console.log("Health Check!")
    res.send("Server UP!!")
}

module.exports = {
    login,
    test,
    register_user,
    generate_otp,
    change_password,
    user_detail
}