import { NextResponse } from "next/server";
import connectdb from "@/lib/db";
import Order from "@/models/order";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectdb();
    const order = await Order.create(body);
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
