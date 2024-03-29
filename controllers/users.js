import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req,res)=>{
  const {email, password} = req.body;

  try {
    const existingUser = await User.findOne({email});

    if(!existingUser) return res.status(404).json({message:"User dosen't exist"});

    const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

    if(!isPasswordCorrect) return res.status(400).json({message: "invalid credentials"});

    const credential = jwt.sign({email: existingUser.email, id: existingUser._id},'test',{expiresIn: '1h'});

    res.status(200).json({result: existingUser, credential});
  } catch (error) {
    res.status(500).json({message: "Something Went Wrong."});
    
  }
};

export const signup = async (req,res)=>{
  const {email,password,confirmPassword, firstName,lastName} = req.body;
  
  try {
    const existingUser = await User.findOne({email});

    if(existingUser) return res.status(400).json({message:"User dosen't exist"});

    if(password !== confirmPassword) res.status(400).json({message:"Password dosen't match"});

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await User.create({email,password: hashPassword, name:`${firstName} ${lastName}`});

    const credential = jwt.sign({email: result.email, id: result._id},'test',{expiresIn: '1h'});

    res.status(200).json({result, credential});
  } catch (error) {
    res.status(500).json({message: "Something Went Wrong."});
  }
}