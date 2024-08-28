import { NextResponse } from 'next/server';
import dbConnect from "../../utils/dbConnect";
import Contract from "../../models/Contract";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    console.log("Request Body:", body);

    const { rawText, summarizedText } = body;

    // Validate input data
    if (!rawText || !summarizedText) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 400 }
      );
    }

    // Create a new contract document
    const newContract = new Contract({
      rawText,
      summarizedText,
    });

    // Save the contract to the database
    await newContract.save();

    // Return a success response
    return NextResponse.json(
      { success: true, data: newContract },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contract:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
