import { NextRequest, NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {

  // get prompt field from the request body
  const reqBody = await req.json();
  const { userPrompt } = reqBody;
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig: { maxOutputTokens: 200 }});

  try {
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json({
      text
    });
  } catch (error) {
    return NextResponse.json({
      text: "Unable to process the prompt. Please try again."
    });
  }
}