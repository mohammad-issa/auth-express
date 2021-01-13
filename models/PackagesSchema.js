const mongoose = require('mongoose');

const PackagesSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [50, 'Name can not be more that 50 characters'],
        required: [true, 'please add a name'],
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        maxlength: [500, 'Name can not be more that 50 characters'],
        required: [true, 'please add a description'],
    },
    phone: {
        type: String,
        maxlength: [20, 'Name can not be more that 50 characters'],
    },
    address: {
        type: String,
    },
    location: {
        type: String,
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating can not be more that 10'],
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Packages', PackagesSchema);
