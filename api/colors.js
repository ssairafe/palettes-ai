const express = require('express');

const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(term) {
  let prompt = `Can you send me a list of 12 different color palettes that most express '${term}' based on color psychology research? Each color palette will consist of different colors that make it. Make sure to order the palettes based on which palettes most express the provided word or phrase. Also be sure to send me them in JSON format. The JSON format will be an object that has properties being the palette name (think of a cool name that describes the palette and make sure it doesnt include the word "Palette"), and the values being an array of two item arrays, first item being the hexcode and second item being a hexcode that is the opposite tint of the first hexcode (opposite tint of the first hexcode just means if its a dark color use white, and if its a light color use black), well refer to these as the tuple values. Every palette needs to have a total of 5 tuple values. Here is an example format that you must not deviate from (except that my example format only has one palette and one tuple value): {"Cool Palette Name that you come up with": [[hexcodeThatMatchesWord, hexcodeThatIsOppositeTintOfhexcodeThatMatchesWord]]} I need you to only reply with the JSON object, no other words or confirmation of receiving this request. Also be sure to send it all in one block of text, not seperate ones. Also do this without breaking lines so that this comes back as one string in an api call`
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.data.choices;
}

router.post('/', (req, res) => {
  runCompletion(req.body.input).then(reply => {
    res.json({ palettes: JSON.parse(reply[0].message.content) });
  })
    .catch(error => {
      console.error(error, reply[0].message.content);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
