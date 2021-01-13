const PackagesSchema = require('../models/PackagesSchema');
const UserSchema = require('../models/UserSchema');
const ErrorResponse = require('../utils/errorResponse');

// const stringServices = require('../services/stringServices');

/**
 * Get all Packages
 * @route   GET /api/packages
 * @access  Public
*/
exports.getPackages = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const packages = await PackagesSchema.find().sort({ 'createdAt' : -1 }).skip(offset).limit(limit);

    res.status(200).send({
      sucsess: true,
      total: await PackagesSchema.countDocuments(),
      data: packages,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get single Package
 * @route   GET /api/packages/:id
 * @access  Public
*/
exports.getPackage = async (req, res, next) => {
  try {
    const package = await PackagesSchema.findById(req.params.id);

    if (!package) {
      return next(new ErrorResponse(`package not found with ID ${req.params.id}`, 404));
    }

    res.status(200).send({
      sucsess: true,
      data: package,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Create new Package
 * @route   POST /api/packages
 * @access  Private
*/
exports.createPackage = async (req, res, next) => {
  try {
    const newName = req.body.name;
    const checkForName = await PackagesSchema.findOne({ name: newName });
    if (!!checkForName) {
      return next(new ErrorResponse('Name already exists', 400));
    }

    const user = await UserSchema.findById(req.user.id);
    req.body = {
      ...req.body,
      user,
    };

    const package = await PackagesSchema.create(req.body);
    res.status(200).json({
      sucsess: true,
      data: package,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Update Package
 * @route   PUT /api/packages/:id
 * @access  Private
*/
exports.updatePackage = async (req, res, next) => {
  try {
    const package = await PackagesSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!package) {
      return next(new ErrorResponse(`package not found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({
      sucsess: true,
      data: package,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Delete Package
 * @route   DELETE /api/packages/:id
 * @access  Private
*/
exports.deletePackage = async (req, res, next) => {
  try {
    const package = await PackagesSchema.findByIdAndDelete(req.params.id)

    if (!package) {
      return next(new ErrorResponse(`package not found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({sucsess: true});
  } catch (err) {
    next(err);
  }
}
