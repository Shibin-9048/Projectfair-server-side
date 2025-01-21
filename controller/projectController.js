// import projects
const projects = require("../model/projectModel");

// add project
exports.addProjectuController = async (req, res) => {
    console.log(`inside add project controller`);

    const { title, language, github, website, overview } = req.body
    console.log(title, language, github, website, overview);

    const projectImage = req.file.filename
    console.log(projectImage);

    const userId = req.payload

    try {
        const existingProjects = await projects.findOne({ github })
        if (existingProjects) {
            res.status(406).json("projects already Exists")
        } else {
            const newProject = new projects({
                title, language, github, website, overview, projectImage, userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(401).json(`Project adding failed due to`, error)
    }
}

// get all projects
exports.getAllProjectController = async (req, res) => {
    // path parameter = req.para
    // query parameter = req.query 13.1.25
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        language: {
            $regex: searchKey, $options :"i" //13.1.25 also below query(find(query))
        }
    }
    
    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    } catch (error) {
        res.status(406).json(error)
    }
}

// get home projects
exports.getHomeProjectController = async (req, res) => {
    try {
        const allProject = await projects.find().limit(3)
        res.status(200).json(allProject)
    } catch (error) {
        res.status(406).json(error)
    }
}

// get user projects
exports.getUserProjectController = async (req, res) => {
    const userId = req.payload
    try {
        const allProject = await projects.find({ userId })
        res.status(200).json(allProject)
    } catch (error) {
        res.status(406).json(error)
    }
}

// remove user projects 14.01.25
exports.removeUserProjectController = async(req,res)=>{
    const {id} = req.params
    try {
        await projects.findByIdAndDelete({_id:id})
        res.status(200).json(`Project Deleted Successfully`)
    } catch (error) {
        res.status(401).json(error)
        
    }
}

// update user controller 17.01.25
exports.editProjectController = async(req, res)=>{
    const {id} = req.params
    const userId = req.payload

    const { title, language, github, website, overview,projectImage } = req.body
    uploadedImage = req.file ? req.file.filename :projectImage

    try {
        const existingProject = await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectImage: uploadedImage,
            userId

        },{new:true})
        await existingProject.save()
        res.status(200).json(existingProject)
        
    } catch (error) {
        res.status().json(error)
    }
}