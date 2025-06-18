import userDetail from "../../../lib/models/models";
import connectMongoDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

export async function POST(request) {
  try {
    const {email,password} = await request.json();
    await connectMongoDB();
    const userData = await userDetail.find({ email });
     var passwordIsValid = bcrypt.compareSync(password, userData[0].password);
     if (!passwordIsValid) {
      return NextResponse.json({ message: "Invalid password" }, { status: 201 });
    }
    var token = jwt.sign({ id: userData._id }, "1234", {
      expiresIn: 86400, // 24 hours
    });    
    return NextResponse.json({ message: "user login success",token }, { status: 201 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
