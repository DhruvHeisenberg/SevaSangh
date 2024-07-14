const User=require("../models/users");
const Issue=require("../models/issues");

const bcrypt=require("bcryptjs");
const secretKey=process.env.JWT_SECRET;
const jwt=require("jsonwebtoken");


const registerUser=async(req,res)=>{
    try{
        const {email,password,name}=req.body;

        const existingUser=await User.findOne({email});
        if (existingUser)
        {
            return res.status(400).json({status:"error",message:"Email already in use"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser=new User({email,password:hashedPassword,name});

        await newUser.save();

        return res.status(201).json({status:'success',data:newUser});
    }
    catch(error)
    {
        res.status(400).json({ status:"error",message:error.message});
    }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try
    {
        const user=await User.findOne({email});
        // console.log("User ",user);

        if(!user)
        {
            return res.status(400).json({error:"Unable to login with these credentials"});
        }

        const isMatch=await bcrypt.compare(password, user.password);
        if (!isMatch) 
        {
            return res.status(400).json({ error: "Unable to login with these credentials" });
        }
        
        const token= jwt.sign({id:user._id},secretKey,{expiresIn:'1h'});
        // console.log(100);
        res.status(200).json({status:"Success",Token:token,email:user.email,admin:user.is_official})
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
}

const getUserDetails=async(req,res)=>{
    try{
        const user=req.user;
        if (!user)
        {
            return res.status(404).json({message:"User not found"});
        }

        const issues=await Issue.find({user:user._id});

        const updatedIssues = issues.map(issue => {
            return {
                ...issue._doc, // Spread the issue document
                upvote: issue.likes.length, // Add the upvote property
                likes: undefined, // Set likes to undefined
            };
        });

        const readData={
            user:user,
            issues:updatedIssues
        }

        res.status(200).json(readData);
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
};

module.exports={registerUser,loginUser,getUserDetails};