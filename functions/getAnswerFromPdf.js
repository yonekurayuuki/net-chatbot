const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: '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', // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

exports.handler = async function(event, context) {
  const { question, pdfUrl } = JSON.parse(event.body);

  try {
    const pdfResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. Use the Ai_PDF plugin to read the following PDF and answer the question.\n\nPDF URL: ${pdfUrl}`
        },
        {
          role: "user",
          content: `${question}`
        }
      ],
      temperature: 0.5,
    });

    return { statusCode: 200, body: JSON.stringify({ answer: pdfResponse.data.choices[0].message.content.trim() }) };
  } catch (error) {
    console.error('Error getting answer from PDF:', error);
    return { statusCode: 500, body: 'Error getting answer from PDF' };
  }
};

