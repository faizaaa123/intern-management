import { connectToMongoDB } from "@/library/connectToMongoDB";
import User from "../../../../../server/models/userModel";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { signIn } from "next-auth/react";

export async function POST (request: NextRequest, response: NextResponse) {

  try {
    
    
    const body = await request.json();
    console.log(body)
    
    const {email , firstname, lastname, password } = body.userData
    
    if (!firstname || !lastname || !email || !password) {
      return new NextResponse("All fields are required. Please fill in the missing fields.", {status: 400})
    }
    
    await connectToMongoDB().catch((error) => {throw new Error(error)})
    
    const exists = await User.findOne({
      email: email
    })
    
    if(exists) {
      console.log("Before creating user")
      return new NextResponse("User already exists", {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newIntern = await User.create({
    //   firstname: `${firstname.charAt(0).toUpperCase()}${firstname.slice(1)}`, //converting to title case
    //   lastname: `${lastname.charAt(0).toUpperCase()}${lastname.slice(1)}`,
    //   email: email,
    //   password: hashedPassword,
    //   //   role: "Intern"
    // });

    const newIntern = await User.findOne({
      email: email,
    })
    
    return NextResponse.json(newIntern)
    
  } catch (error) {
    console.log("This is the logged error: ", error)
  }
    
  }