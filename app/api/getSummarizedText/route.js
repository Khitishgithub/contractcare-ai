// pages/api/getSummarizedText.js
// pages/api/getSummarizedText.js
import { NextResponse } from "next/server";

import dbConnect from "../../utils/dbConnect";
import Contract from "../../models/Contract";

export async function GET(req) {
  await dbConnect();

  try {
    const contracts = await Contract.find().sort({ createdAt: -1 }).limit(1); // Fetch the most recent contract

    if (contracts.length === 0) {
      return NextResponse.json({ success: false, message: "No contracts found" }, { status: 404 });
    }

    const latestContract = contracts[0];

    return NextResponse.json(
      { success: true, summarizedText: latestContract.summarizedText },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching summarized text:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
