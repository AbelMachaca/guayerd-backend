const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const conn = require('../config/salesforce');

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
        // Buscar usuario por correo electrónico
        const existingUser = await conn.sobject("User__c").findOne({ Email__c: email }).execute();
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario en Salesforce
        const newUser = await conn.sobject("User__c").create({
            Name: name,
            Email__c: email,
            Password__c: hashedPassword,
            Role__c: role
        });

        if (!newUser.success) {
            return res.status(500).json({ msg: 'Failed to create user' });
        }

        const payload = {
            user: {
                id: newUser.id,
                role: role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await conn.sobject("User__c").findOne({ Email__c: email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.Password__c);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.Id,
                role: user.Role__c
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
