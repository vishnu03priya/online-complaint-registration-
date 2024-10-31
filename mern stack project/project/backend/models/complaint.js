const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Agent handling this complaint
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String },
        timestamp: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
