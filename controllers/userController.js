const User = require('../models/userModal')

 const loginController = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email,password})
        if (!user) {
            return res.status(404).send("user not found")
        }
        res.status(200).json({
            success:true,
            user
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error
        })
    }
}
const registerController = async(req,res)=>{

   try{
    const exist = await User.findOne({email:req.body.email})
    if(exist){
        return res.status(401).send("User already exist")
    }
    const user = req.body
    const newUser = new User(user)
    await newUser.save();
    res.status(201).json({success:true,newUser})
   }catch(error){
    res.status(500).json({success:false,error:error.message})
   }
}

module.exports ={loginController,registerController}