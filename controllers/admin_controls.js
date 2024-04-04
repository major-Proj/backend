const { UserModel,
    otpModel,
    projectAssignmentModel,
    timesheetModel,
    projectModel,
    feedbackModel } = require('../model/mongo_models');

const create_project = async (req, res) => {
    try {

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters[randomIndex];
        }


        const { name, start, end, client_name } = req.body;


        const newProj = new projectModel({
            PID: randomString,
            name: name,
            start: start,
            end: end,
            client_name: client_name,
            created_at: new Date()
        });

        try {
            const result = await newProj.save();
            console.log(result);

        } catch (error) {
            console.error(error);
        }
        res.json({ message: "Project Added" });


    } catch (err) {
        console.error('Error creating project', err);
        res.status(500).json({ message: "Error creating project" });
    }
};

const allocate_project = async (req, res) => {
    try {
        const { PID, email, allocation_start, allocation_end } = req.body;
        console.log(req.body);

        const newProj = new projectAssignmentModel({
            PID: PID,
            email: email,
            allocation_start: allocation_start,
            allocation_end: allocation_end,
            created_at: new Date()
        });

        try {
            const result = await newProj.save();
            console.log(result);

        } catch (error) {
            console.error(error);
        }
        res.json({ message: "Project allocated" });


    } catch (err) {
        console.error('Error creating project', err);
        res.status(500).json({ message: "Error creating project" });
    }
};

const getUsersProjects = async (req, res) => {
    try {
        const Users = await UserModel.find();
        const Projects = await projectModel.find();

        const formattedData = {
            message: "data received!",
            users: Users.map(user => ({ email: user.email, name: user.first_name })),
            projects: Projects.map(project => ({ PID: project.PID, name: project.name }))
        };

        res.json(formattedData);

    } catch (err) {
        console.error('Error creating project', err);
        res.status(500).json({ message: "Error creating project" });
    }
};

module.exports = {
    create_project,
    getUsersProjects,
    allocate_project
}