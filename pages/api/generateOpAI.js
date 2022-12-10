import { Configuration, OpenAIApi } from "openai";

export default function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { body } = req;
    data = openAIGeneration(body);
    return res.status(200).json(data);
  }
} 


const configuration = new Configuration({
  apiKey: "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"
});
  
const openai = new  OpenAIApi(configuration);

export const openAIGeneration = async (prompt) => {
  const result = await openai.createImage({
    prompt,
    n:1,
    size: "1024x1024",
  });

  const urlOpenAI = result.data.data[0].url;

  return urlOpenAI
};
