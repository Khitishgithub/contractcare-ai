// pages/api/saveinvoice.js
import { NextResponse } from 'next/server';
import dbConnect from '../../utils/dbConnect';
import Invoice from '../../models/Invoice';

export async function POST(req) {
  await dbConnect();

  try {
    const { invoicesno, item, quantity, rate, date } = await req.json();

    if (!invoicesno || !item || !quantity || !rate || !date) {
      return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
    }

    const newInvoice = new Invoice({
      invoicesno,
      item,
      quantity,
      rate,
      date,
    });

    await newInvoice.save();

    return NextResponse.json({ success: true, data: newInvoice }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
