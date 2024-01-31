const mongoose = require('mongoose');

const finFormDataSchema = new mongoose.Schema({
    responses: [
        {
            question: String,
            answer: mongoose.Schema.Types.Mixed,
        }
    ]
});

const finFormDataModel = mongoose.model('finFormData', finFormDataSchema);

const submitFinForm = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8, qn9, qn10 } = req.body;

        const questionsAndAnswers = [
            {question: 'What area of financial services are you interested in?', answer: qn1 },
            {question: 'What tasks or activities do you want to accomplish using cloud services?', answer: qn2 },
            {question: 'Would you like to implement a financial chatbot for customer inquiries and support?', answer: qn3 },
            {question: 'Are you looking for a system to manage and track insurance claims and customer policy details?', answer: qn4 },
            {question: 'What is the expected geographical distribution of your users?', answer: qn5 },
            {question: 'Do you have any existing software?', answer: qn6 },
            {question: 'What is your expected user load?', answer: qn7 },
            {question: 'Are you looking to use a cloud solution for handling payments and currency exchange across borders?', answer: qn8 },
            {question: 'Would you like to implement a system for secure document management and collaboration among your financial team and clients?', answer: qn9 },
            {question: 'Do you require cloud tools for managing customer financial transactions and accounting?', answer: qn10 },
        ];

        const finFormData = new finFormDataModel({
            responses: questionsAndAnswers,
        });

        await finFormData.save();

        res.status(201).json({success: true, message: 'Finance Form data saved successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

module.exports = mongoose.model('finController', finFormDataSchema);
module.exports = { submitFinForm };