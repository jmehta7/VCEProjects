
import userDetail from "../../lib/models/models";
import connectMongoDB from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { name,email,phone,password} = await request.json();
        await connectMongoDB();         
        await userDetail.create({ name,email,phone,password});
        return NextResponse.json({ message: "user Created" }, { status: 201 });
    } catch (error) {
        console.log({error})
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const users = await userDetail.find();
        return NextResponse.json({ users });
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        return NextResponse.json({ error: "Failed to retrieve tasks" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {    
      const {id,name,email,phone} =await request.json()
      await connectMongoDB();
      const user_set ={name,email,phone}
      const userData =await userDetail.findByIdAndUpdate(id,user_set,{new:true})
      return NextResponse.json({ message: "user update",list:userData }, { status: 201 });
    } catch (error) {
      console.log({ error });
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(request) {
    try {    
      const {id} =await request.json()
      await connectMongoDB();    
      const userData =await userDetail.findByIdAndDelete(id)
      return NextResponse.json({ message: "user delete",list:userData }, { status: 201 });
    } catch (error) {
      console.log({ error });
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 500 }
      );
    }
  }