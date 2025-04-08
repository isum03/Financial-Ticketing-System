const { body, check } = require('express-validator');

//user signup validation
exports.validateSignup = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('username').trim().isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('roleId').isInt().withMessage('Valid role ID is required')
];

//user login validation
exports.validateLogin = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

//validate create and update ticket
exports.validateTicket = [
    check('client_name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Client name must be between 2 and 100 characters'),
    
    check('client_address')
        .trim()
        .notEmpty()
        .withMessage('Client address is required'),
    
    check('email')
        .trim()
        .isEmail()
        .withMessage('Must be a valid email address')
        .isLength({ max: 100 })
        .withMessage('Email must not exceed 100 characters'),
    
    check('phone_number')
        .trim()
        .isLength({ min: 10, max: 20 })
        .withMessage('Phone number must be between 10 and 20 characters'),
    
    check('amount')
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('Amount must be a valid number with up to 2 decimal places')
        .isFloat({ min: 0 })
        .withMessage('Amount must be greater than 0'),
    
    check('assigned_to')  // This matches the payload field name
        .isInt()
        .withMessage('Valid broker ID is required'),    
    
    check('status')
        .optional()
        .isIn(['pending', 'in_progress', 'completed', 'cancelled'])
        .withMessage('Invalid status value')
];


/*
exports.validateTicketAssignment = [
    body('assignedTo')
        .isInt()
        .notEmpty()
        .withMessage('Valid broker ID is required')
];*/
//validate the forgot pasword 
exports.validateForgotPassword = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .trim()
        .normalizeEmail()
];