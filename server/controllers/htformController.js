const mongoose = require('mongoose');

const healthFormDataSchema = new mongoose.Schema({
    responses: [
        {
            question: String,
            answer: mongoose.Schema.Types.Mixed,
        }
    ]
});

const healthFormDataModel = mongoose.model('healthFormData', healthFormDataSchema);

const submitHealthForm = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8, qn9, qn10} = req.body;

        const questionsAndAnswers = [
            {question: 'What tasks or activities do you want to accomplish using cloud services?', answer: qn1 },
            {question: 'Are you looking to enhance the efficiency of appointment scheduling and management?', answer: qn2 },
            {question: 'Would you like to improve patient engagement and communication?', answer: qn3},
            {question: 'Are you interested in enhancing healthcare inventory and supply chain management?', answer: qn4 },
            {question: 'Are you interested in improving healthcare analytics and reporting?', answer: qn5 },
            {question: 'Would you like to implement a healthcare chatbot for patient inquiries and support?', answer: qn6 },
            {question: 'What is the expected geographical distribution of your users?', answer: qn7 },
            {question: 'Do you have any existing software?', answer: qn8 },
            {question: 'Would you like to implement patient engagement portals for feedback, reviews, and interaction?', answer: qn9 },
            {question: 'Do you need a cloud service for remote patient monitoring, early warning systems, and alerts?', answer: qn10},
        ];

        const healthFormData = new healthFormDataModel({
            responses: questionsAndAnswers,
        });

        await healthFormData.save();
        res.status(201).json({success: true, message: 'Healthcare Form data saved successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

module.exports = mongoose.model('htformController', healthFormDataSchema);
module.exports = { submitHealthForm };



