

// import user
const users = require('../model/userModel')

// import jwt token
const jwt = require('jsonwebtoken')


// register
exports.register = async (req, res) => {
    console.log(`inside register function`);
    const { username, email, password } = req.body
    console.log(username, email, password);


    try {
        const existingUsers = await users.findOne({ email })
        if (existingUsers) {
            res.status(406).json("user already Exists")
        } else {
            const newUser = new users({
                username,
                email,
                password,
                profile: "",
                linkedln: "",
                github: ""
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
    console.log(email, password);
    try {
        const existingUsers = await users.findOne({ email, password })
        if (existingUsers) {
            const token = jwt.sign({ userId: existingUsers._id }, "secretkey")
            res.status(200).json({ existingUsers, token })
        } else {

            res.status(406).json("incorrect email or password")
        }

    } catch (error) {
        res.status(401).json(error)

    }


}

// update user profile 18.01.25
exports.editProfileController = async(req, res)=>{
    const userId = req.payload

    
    const { username, email, password, profile, github, linkedln } = req.body
    uploadImg = req.file ? req.file.filename:profile
    try {
        const existingUser = await users.findByIdAndUpdate({_id:userId},{
            username,
            email,
            password,
            profile: uploadImg,
            linkedln,
            github
        },{new:true})
        await existingUser.save()
        res.status(200).json(existingUser)

    } catch (error) {
        res.status().json(error)
    }
}
