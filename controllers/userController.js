const jwt = require('jsonwebtoken')
const users = require('../model/userModel')

// register
exports.register = async (req, res) => {
    // /logic
    console.log("Inside register function");
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        const existingUSer = await users.findOne({ email })
        if (existingUSer) {
            res.status(406).json('User Already exist')
        }
        else {
            const newUser = new users({
                username,
                email,
                password,
                profileImg: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// login
exports.login = async (req, res) => {
    const { email, password } = req.body
    // console.log(email, password);
    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId:existingUser._id},'secretkey')
            res.status(200).json({existingUser,token})
        }
        else {
            res.status(406).json("Incorrect email or password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// update user profile
exports.updateUserProfileController=async(req,res)=>{
     const userId = req.payload
     const {username,email,password,profileImg,role} = req.body
     uploadImg = req.file?req.file.filename:profileImg
     try {
        const existingUser = await users.findByIdAndUpdate({_id:userId},{
            username,
            email,
            password,
            profileImg:uploadImg,
            role
        },{new:true})
        await existingUser.save()
        res.status(200).json(existingUser)
     } catch (error) {
        res.status(401).json(error)
     }
}