const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { 
    getRoles, 
    createRole, 
} = require('../controllers/roleController');

//get all routes
router.get('/', auth, getRoles);



module.exports = router;