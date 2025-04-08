const db = require('../Config/db');
//get all roles
exports.getRoles = async (req, res) => {
    try {
        //query to fetch dtata from db
        const [roles] = await db.execute(
            'SELECT role_id, role_name, description FROM roles'
        );
        res.json(roles);
    } catch (error) {
        console.error("Get Roles Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/*create new roles
exports.createRole = async (req, res) => {
    try {
        const { roleName, description } = req.body;
        
        // Check if role already exists
        const [existingRoles] = await db.execute(
            'SELECT role_id FROM roles WHERE role_name = ?',
            [roleName]
        );

        if (existingRoles.length > 0) {
            return res.status(400).json({ message: "Role already exists" });
        }
        //Inserts a new role
        const [result] = await db.execute(
            'INSERT INTO roles (role_name, description) VALUES (?, ?)',
            [roleName, description]
        );

        res.status(201).json({
            message: "Role created successfully",
            roleId: result.insertId
        });
    } catch (error) {
        console.error("Create Role Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};*/
/*update the role
exports.updateRole = async (req, res) => {
    try {
        const { roleName, description } = req.body;
        const roleId = req.params.id;

        await db.execute(
            'UPDATE roles SET role_name = ?, description = ? WHERE role_id = ?',
            [roleName, description, roleId]
        );

        res.json({ message: "Role updated successfully" });
    } catch (error) {
        console.error("Update Role Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
//delete role
exports.deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;

        // Check if role is being used by any users
        const [usersWithRole] = await db.execute(
            'SELECT COUNT(*) as count FROM users WHERE role_id = ?',
            [roleId]
        );

        if (usersWithRole[0].count > 0) {
            return res.status(400).json({ 
                message: "Cannot delete role: It is assigned to existing users" 
            });
        }

        await db.execute('DELETE FROM roles WHERE role_id = ?', [roleId]);
        res.json({ message: "Role deleted successfully" });
    } catch (error) {
        console.error("Delete Role Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};*/