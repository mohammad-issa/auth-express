const express = require('express');

const {
	getPackages,
	getPackage,
	createPackage,
	updatePackage,
	deletePackage,
} = require('../controllers/packages');

const { protect } = require('../middleware/auth');

const router = express.Router();

router
	.route('/')
		.get(getPackages)
		.post(protect, createPackage)

router
	.route('/:id')
		.get(getPackage)
		.put(protect, updatePackage)
		.delete(protect, deletePackage)

module.exports = router
