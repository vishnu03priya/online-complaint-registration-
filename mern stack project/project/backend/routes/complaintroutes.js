const express = require('express');
const Complaint = require('../models/complaint');
const { protect } = require('../middleware/authmiddleware');
const router = express.Router();

// Create a Complaint
router.post('/', protect, async (req, res) => {
    const { title, description } = req.body;

    try {
        const complaint = new Complaint({
            user: req.user.id,
            title,
            description,
        });

        await complaint.save();
        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get User Complaints
router.get('/my-complaints', protect, async (req, res) => {
    try {
        const complaints = await Complaint.find({ user: req.user.id });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get Single Complaint
router.get('/:id', protect, async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id).populate('user', 'name email');
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Add Message to Complaint
router.post('/:id/messages', protect, async (req, res) => {
    const { message } = req.body;

    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

        const newMessage = { sender: req.user.id, message };
        complaint.messages.push(newMessage);

        await complaint.save();
        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
