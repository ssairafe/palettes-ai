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

  let prompt = `Can you send me an authentic, chef level recipe for the ${country} dish '${dish}'?`

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
    res.json({ recipe: reply[0].message.content });
  })
});

module.exports = router;
