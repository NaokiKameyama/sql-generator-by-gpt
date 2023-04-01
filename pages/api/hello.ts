// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-5STfFNTFOxGKcerNgVh5zJFg",
  apiKey: process.env.OPENAI_API_KEY,
});
// const configuration = new Configuration({
//   organization: "org-8Q88nrRaQZ4lC18QcPXGNYSJ",
//   apiKey: "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",
// });
type Data = {
  gptMessage: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { inputData, requirement } = req.body;
  const content = `以下ようなinputDataテーブルがあります。\n${inputData}\n\n${requirement}\n出力結果はSQLのコードのみとしてください。`;
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });
  const gptMessage = completion.data.choices[0].message?.content ?? "";
  res.status(200).json({ gptMessage });
  // res.status(200).json({ gptMessage: content });
}
