const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using: POST "/api/auth/createuser". Doesn't require Auth/ No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 character').isLength({ min: 5 })
 ],

  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already

    try{

    let user=await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({error:"Sorry a user this email already exists"})
    }
    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    
    res.json(user)
    //  Catch errors
  } catch(error){
   console.error(error.message);
   res.status(500).send("Some error occured");
  }

  })

module.exports = router
