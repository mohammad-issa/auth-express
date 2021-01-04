const express = require('express');

const {
	getPackages,
	getPackage,
	createPackage,
	updatePackage,
	deletePackage,
} = require('../controllers/packages')

const router = express.Router();

router
	.route('/')
		.get(getPackages)
		.post(createPackage)

router
	.route('/:id')
		.get(getPackage)
		.put(updatePackage)
		.delete(deletePackage)

module.exports = router
