
import { NextResponse } from 'next/server';
import dbConnect from "../../utils/dbConnect";
import Contract from "../../models/Contract";
import { Client } from "@octoai/client";

const client = new Client(process.env.NEXT_PUBLIC_OCTO_CLIENT_TOKEN);

export async function POST(req) {
  try {
    const { text } = await req.json();

   
    await dbConnect();
    const latestContract = await Contract.findOne().sort({ createdAt: -1 });

    if (!latestContract) {
      throw new Error("No existing contract found.");
    }

    // Summarize the amendment
    const amendmentCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a tool that summarizes text. This tool processes an amendment text and compares it with an existing contract summary. Combine both summaries into a new summary.",
        },
        {
          role: "assistant",
          content: `text:\n${text}`,
        },
      ],
      model: "mixtral-8x7b-instruct-fp16",
      presence_penalty: 0,
      temperature: 0.1,
      top_p: 0.9,
    });

    const amendmentSummary = amendmentCompletion.choices[0].message.content;

    // Create a new summary combining both the existing contract and the amendment
    const combinedSummary = `${latestContract.summarizedText}\n\nAmendment:\n${amendmentSummary}`;

    return new Response(JSON.stringify({ message: { content: combinedSummary } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in API handler:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
