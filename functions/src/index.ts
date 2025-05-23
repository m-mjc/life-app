import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import OpenAI from "openai";

/* ① ロボット博士の図書カード */
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

/* ② 受付カウンター ”suggestEmotion” を開く */
export const suggestEmotion = onCall(
  {timeoutSeconds: 30, memory: "256MiB"},
  async (request) => {
    const {emoji, text} = request.data; // 子どもから来た質問
    logger.info("質問を受信", {emoji, text});

    /* ③ 本（GPT-4o-mini）に質問する */
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini", // 安い賢い本
      messages: [
        {
          role: "system",
          content:
            "あなたは感情の先生です。簡潔に5個の感情名だけを日本語で箇条書きしてください。",
        },
        {
          role: "user",
          content: `アイコン:${emoji}  出来事:${text}`,
        },
      ],
    });

    /* ④ 返事をそのまま子どもへ返す */
    return {suggestions: res.choices[0].message.content};
  }
);
