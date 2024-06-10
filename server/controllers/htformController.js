const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
app.use(express.json());

const healthFormDataSchema = new mongoose.Schema({
    responses: {
        type: Map,
        of: [mongoose.Schema.Types.Mixed],
    },
});

const healthFormDataModel = mongoose.model('healthFormData', healthFormDataSchema);

const submitHealthForm = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8, qn9, qn10 } = req.body;

        const questionsAndAnswers = {
            'What tasks or activities do you want to accomplish using cloud services?': qn1,
            'Are you looking to enhance the efficiency of appointment scheduling and management?': qn2,
            'Would you like to improve patient engagement and communication?': qn3,
            'Are you interested in enhancing healthcare inventory and supply chain management?': qn4,
            'Are you interested in improving healthcare analytics and reporting?': qn5,
            'Would you like to implement a healthcare chatbot for patient inquiries and support?': qn6,
            'What is the expected geographical distribution of your users?': qn7,
            'Do you have any existing software?': qn8,
            'Would you like to implement patient engagement portals for feedback, reviews, and interaction?': qn9,
            'Do you need a cloud service for remote patient monitoring, early warning systems, and alerts?': qn10,
        };

        console.log('Questions and Answers:', questionsAndAnswers);
        const jsonQuestionsAndAnswers = JSON.stringify(questionsAndAnswers);
        console.log('JSON Questions and Answers:', jsonQuestionsAndAnswers);

        const healthFormData = new healthFormDataModel({
            responses: questionsAndAnswers,
        });

        await healthFormData.save();

        const getServiceResponse = await axios.post('http://localhost:9000/getService', questionsAndAnswers);

        res.send(JSON.stringify(getServiceResponse.data));


        console.log(getServiceResponse.data, "form data saved");
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    htformController: mongoose.model('htformController', healthFormDataSchema),
    submitHealthForm,
};
