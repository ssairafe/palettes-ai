const express = require('express');

const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(recipeRequest) {
  const {
    country,
    dish,
    foodRestrictions,
  } = recipeRequest;

  let prompt = `Consider yourself a master chef, can you send me an authentic recipe for the ${country} dish '${dish}'? Be sure to send me this in JSON format as an object with the four properties name (its value is the name of dish), description (its value is the description of the dish), ingredients (an array of the ingredients; every item of this array is a string of the ingredient and measurement. Example is "1/2 tablespoon of salt"), and steps (an array of the individual steps to cook the recipe). Do not deviate from this structure and do not send anything else aside from the JSON object (no confirmation that you recieved this request)`

  if (foodRestrictions !== '') {
    prompt += `When creating the recipe, please keep in mind that I have the following food allergies and restrictions: ${foodRestrictions}. If there are alternative ingredients for any of those restrictions that would actually work with the recipe, please suggest included in the recipe`
  }
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.data.choices;
}

router.post('/', (req, res) => {
  runCompletion(req.body.input).then(reply => {
    res.json({ recipe: JSON.parse(reply[0].message.content) });
  })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
