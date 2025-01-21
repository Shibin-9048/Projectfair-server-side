// import express
const express = require('express')

// import userController
const userController = require('./controller/userController')

// import project controller
const projectController = require('./controller/projectController')

// import jwtmiddleware
const jwtMiddleware = require('./middleware/jwtMiddleware')

// import multer
const multerConfig = require('./middleware/multerMiddleware')

// instance router
const router = new express.Router()

// Register
router.post('/register',userController.register)

module.exports = router

// Login
router.post('/login',userController.login)

// add Project
router.post('/add-project',jwtMiddleware, multerConfig.single("projectImage"), projectController.addProjectuController)

// get all projects 09.01.25
router.get('/all-project',jwtMiddleware, projectController.getAllProjectController)

// get home projects
router.get('/home-project', projectController.getHomeProjectController)

// get user projects
router.get('/user-project', jwtMiddleware,projectController.getUserProjectController)

// remove user projects 14.01.25
router.delete('/remove-userproject/:id', jwtMiddleware,projectController.removeUserProjectController)

// update user project 17.01.25
router.put('/update-userProject/:id' , jwtMiddleware, multerConfig.single("projectImage") ,projectController.editProjectController)

// update userProfile 18.01.25
router.put('/update-userProfile',jwtMiddleware,multerConfig.single("profile"), userController.editProfileController)


module.exports = router