import userDetail from "../../../lib/models/models";
import connectMongoDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";
var bcrypt = require("bcryptjs");

export async function POST(request) {
    try {
        const { name,email,phone,password} = await request.json();
        const password_data = bcrypt.hashSync(password, 8)
        await connectMongoDB();         
        await userDetail.create({ name,email,phone,password:password_data});
        return NextResponse.json({ message: "user Created" }, { status: 201 });
    } catch (error) {
        console.log({error})
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}
