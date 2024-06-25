// controllers/userController.js
const conn = require('../config/salesforce');

exports.getUsers = async (req, res) => {
    try {
        const result = await conn.sobject('User__c').find({}, 'Id, Name, Email__c, Role__c');
        res.json(result); 

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching users' });
    }
};


// Editar un usuario
exports.editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    try {
        const user = await conn.sobject("User__c").update({
            Id: id,
            Name: name,
            Email__c: email,
            Role__c: role
        });

        if (!user.success) {
            return res.status(500).json({ msg: 'Failed to update user' });
        }

        res.json({ msg: 'User updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user' });
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await conn.sobject("User__c").destroy(id);

        if (!user.success) {
            return res.status(500).json({ msg: 'Failed to delete user' });
        }

        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting user' });
    }
};