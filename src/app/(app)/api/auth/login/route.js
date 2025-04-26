import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Admin from "../../../../models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminEmails = ["dhamijamridul@gmail.com", "admin2@example.com"]; 

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }

    const isAdmin = adminEmails.includes(email);

    const token = jwt.sign(
      { id: admin._id, email: admin.email, isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const response = NextResponse.json(
      {
        message: "Login Successful",
        user: {
          id: admin._id,
          email: admin.email,
          name: admin.name || "", // if you have name field
          isAdmin,
        },
      },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; Path=/; Max-Age=7200`
    );

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
