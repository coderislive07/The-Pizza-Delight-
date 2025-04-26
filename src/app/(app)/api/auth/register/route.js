import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Admin from "../../../../models/admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    return NextResponse.json({ message: "Admin Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}