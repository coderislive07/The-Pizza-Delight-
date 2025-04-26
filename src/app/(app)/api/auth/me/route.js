import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

export async function GET(req) {
  try {
    // Parse cookies from the request headers
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json(
      { id: decoded.id,email: decoded.email, role: decoded.isAdmin ? "admin" : "user" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
  }
}