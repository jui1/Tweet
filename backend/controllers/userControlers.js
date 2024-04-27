import { User } from "../Models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 16);
        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const Login =  async(req,res) =>{
    try {
        const {email, password} =  req.body;
        if(!email || !password){
            return res.status(401).json({
                message: "Incorrect email and password",
                success: false
            });
        }
        const user = await findOne({email});
        if(!user){
            return res.status(401).json({
                message :"User does not exist with this email",
                success :false
            })
        }

        const isMatch = await bcryptjs.compare(user.password,  password );
        if(!isMatch){
            return res.status(401).json({
                message:"Incorrent email or password",
                success:false
            })
        }
        const tokenData = {
          userId:user._id  
        }
        const token = await jwt.sign({tokenData},process.env.TOKENSECRET,{expiresIn:"1d" , httpOnly :true}).json({
           
            message:`Welcome back ${user.name}`,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}