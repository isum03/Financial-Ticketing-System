//verify the role based checked
const roleCheck = (allowedRoles) => {
    return (req, res, next) => {
        //debug logging
        console.log("User role:", req.user.role_name);
        console.log("Allowed roles:", allowedRoles);
        // Check if the user is authenticated and has the required role
        if (!req.user || !allowedRoles.includes(req.user.role_name)) {
            return res.status(403).json({ message: "Access denied" });
        }
        //continue to the next middleware or route handler
        next();
    };
};

module.exports = roleCheck;