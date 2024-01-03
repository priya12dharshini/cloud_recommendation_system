const mongoose = require('mongoose');

const healthcareFormDataSchema = new mongoose.Schema({
  responses: [
    {
      question: String,
      answer: mongoose.Schema.Types.Mixed, // This allows storing various data types
    }
  ]
});

const HealthcareFormDataModel = mongoose.model('HealthcareFormData', healthcareFormDataSchema);


const submitHealthcareForm = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8, qn9, qn10 } = req.body;

    // Creating an array of question-answer pairs
    const questionsAndAnswers = [
      { question: 'What tasks or activities do you want to accomplish using cloud services?', answer: qn1 },
      { question: 'Are you looking to enhance the efficiency of appointment scheduling and management?', answer: qn2 },
      { question: 'Would you like to improve patient engagement and communication?', answer: qn3 },
      { question: 'Are you interested in enhancing healthcare inventory and supply chain management?', answer: qn4 },
      { question: 'Are you interested in improving healthcare analytics and reporting?', answer: qn5 },
      { question: 'Would you like to implement a healthcare chatbot for patient inquiries and support?', answer: qn6 },
      { question: 'What is the expected geographical distribution of your users?', answer: qn7 },
      { question: 'Do you have any existing software?', answer: qn8 },
      { question: 'Would you like to implement patient engagement portals for feedback, reviews, and interaction?', answer: qn9 },
      { question: 'Do you need a cloud service for remote patient monitoring, early warning systems, and alerts?', answer: qn10 }
    ];

    // Create a new HealthcareFormDataModel instance
    const hformData = new HealthcareFormDataModel({
      responses: questionsAndAnswers,
    });

    // Save the data to MongoDB
    await hformData.save();

    res.status(201).json({ success: true, message: 'Healthcare Form data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = mongoose.model('hformController', healthcareFormDataSchema);
module.exports = { submitHealthcareForm };
