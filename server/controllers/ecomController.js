const mongoose = require('mongoose');

const ecomFormDataSchema = new mongoose.Schema({
  responses: [
    {
      question: String,
      answer: mongoose.Schema.Types.Mixed,
    }
  ]
});

const EcomFormDataModel = mongoose.model('EcomFormData', ecomFormDataSchema);

const submitEcomForm = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8, qn9, qn10, qn11, qn12, qn13, qn14 } = req.body;

    const questionsAndAnswers = [
      { question: 'What is your primary goal?', answer: qn1 },
      { question: 'What tasks or activities do you want to accomplish using cloud services?', answer: qn2 },
      { question: 'What is the expected peak sales period?', answer: qn3 },
      { question: 'Are you interested in making your website load faster and ensuring a better experience for your visitors?', answer: qn4 },
      { question: 'Would you like to implement an ecommerce chatbot for customer inquiries and support?', answer: qn5 },
      { question: 'What is the expected geographical distribution of your users?', answer: qn6 },
      { question: 'Do you require cloud-based tools for inventory demand forecasting and stock optimization?', answer: qn7 },
      { question: 'Are you interested in customer sentiment analysis and social media monitoring?', answer: qn8 },
      { question: 'Are you looking for a solution to manage customer reviews and feedback effectively?', answer: qn9 },
      { question: 'Are you looking for a system to manage returns and refunds efficiently?', answer: qn10 },
      { question: 'How often you would like to know the updates of your usage?', answer: qn11 },
      { question: 'Do you have any existing software?', answer: qn12 },
      { question: 'Are you looking for a system to optimize pricing strategies and discounts for your products?', answer: qn13 },
      { question: 'Would you like to enhance the customer shopping experience through mobile apps?', answer: qn14},
    ];

    const ecomFormData = new EcomFormDataModel({
      responses: questionsAndAnswers,
    });

    await ecomFormData.save();

    res.status(201).json({ success: true, message: 'Ecommerce Form data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = mongoose.model('ecomController', ecomFormDataSchema);
module.exports = { submitEcomForm };

