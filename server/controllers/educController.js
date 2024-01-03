const mongoose = require('mongoose');

const eduFormDataSchema = new mongoose.Schema({
  responses: [
    {
      question: String,
      answer: mongoose.Schema.Types.Mixed,
    }
  ]
});

const EduFormDataModel = mongoose.model('eduFormData', eduFormDataSchema);

const submitEduForm = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8, qn9, qn10, qn11 } = req.body;

    const questionsAndAnswers = [
      { question: 'What educational area are you interested in?', answer: qn1 },
      { question: 'What tasks or activities do you want to accomplish using cloud services?', answer: qn2 },
      { question: 'Do you require a cloud solution for online testing and examination management?', answer: qn3 },
      { question: 'Would you like to implement a virtual library system for students to access digital resources and books?', answer: qn4 },
      { question: 'Do you require a cloud solution for managing educational research and data analysis projects?', answer: qn5 },
      { question: 'Do you require cloud-based tools for remote student counseling and support services?', answer: qn6 },
      { question: 'Are you interested in a cloud service for interactive virtual labs and science experiments for students?', answer: qn7 },
      { question: 'What is the expected geographical distribution of your users?', answer: qn8 },
      { question: 'Would you like to implement chatbot for managing queries?', answer: qn9 },
      { question: 'Do you require a cloud service for secure student identity verification and authentication?', answer: qn10 },
      { question: 'What is your expected user load?', answer: qn11 },
    ];

    const eduFormData = new EduFormDataModel({
      responses: questionsAndAnswers,
    });

    await eduFormData.save();

    res.status(201).json({ success: true, message: 'Education Form data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = mongoose.model('educController', eduFormDataSchema);
module.exports = { submitEduForm };
