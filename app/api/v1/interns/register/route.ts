import User from "@/server/models/userModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST (request) {

    const body = await request.json();

    const {email , firstname, lastname, password } = body.userData
  
    if (!firstname || !lastname || !email || !password) {
      return new NextResponse("All fields are required. Please fill in the missing fields.", {status: 400})
    }
  
    const exists = await User.findOne({where: {
      email: email
    }})
  
    if(exists) {
        return new NextResponse("User already exists", {status: 400})
    }
  
  //   const hashedPassword = await bcrypt.hash(password, 10);
  
    const newIntern = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password ,
      role:"intern"
    });
    
    return NextResponse.json(newIntern)


}