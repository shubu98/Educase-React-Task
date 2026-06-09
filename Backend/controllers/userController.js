const db = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    const { full_name, phone_number, email_address, password, company_name, is_agency, profile_image_url } = req.body;
    try {
        const [existing] = await db.query('SELECT id FROM users WHERE email_address = ?', [email_address]);
        if (existing.length > 0) return res.status(400).json({ error: 'Email address already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await db.query(
            'INSERT INTO users (full_name, phone_number, email_address, password, company_name, is_agency, profile_image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [full_name, phone_number, email_address, hashedPassword, company_name, is_agency, profile_image_url || null]
        );
        res.status(201).json({ message: 'User account created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error encountered during user insertion' });
    }
};

exports.loginUser = async (req, res) => {
    const { email_address, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email_address = ?', [email_address]);
        if (users.length === 0) return res.status(400).json({ error: 'User account not found' });

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid credentials provided' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server authentication issue' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const [users] = await db.query('SELECT full_name, email_address, phone_number, company_name, profile_image_url FROM users WHERE id = ?', [req.user.id]);
        if (users.length === 0) return res.status(404).json({ error: 'Profile metadata not found' });
        res.json(users[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching resource data profile' });
    }
};
