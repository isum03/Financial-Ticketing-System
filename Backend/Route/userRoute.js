const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
//import user controller methods
const { 
    getUsers, 
    getUserById, 
} = require('../controllers/userController');

//get all routes
router.get('/', auth, roleCheck(['admin']), getUsers);
//get specific user by Id
router.get('/:id', auth, getUserById);

module.exports = router;