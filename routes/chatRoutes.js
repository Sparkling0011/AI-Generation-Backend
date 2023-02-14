import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const router = Router();

router.route("/").post(async (req, res) => {
  try {
    let { prompt, context } = req.body;
    prompt = `${context}\nHuman: ${prompt}\nAI: `;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    const answer = completion.data.choices[0].text;
    res.status(200).json({ answer, updateContext: prompt + answer });
  } catch (error) {
    res.status(500).json("请求错误");
  }
});

export default router;
