const Bootcamp = require('../models/BootcampSchema');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Get all bootcamps
 * @route   GET /api/bootcamps
 * @access  Public
*/
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).send({
      sucsess: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get single bootcamp
 * @route   GET /api/bootcamps/:id
 * @access  Public
*/
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with ID ${req.params.id}`, 404));
    }

    res.status(200).send({
      sucsess: true,
      data: bootcamp,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Create new bootcamp
 * @route   POST /api/bootcamps
 * @access  Private
*/
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(200).json({
      sucsess: true,
      data: bootcamp,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Update bootcamp
 * @route   PUT /api/bootcamps/:id
 * @access  Private
*/
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({
      sucsess: true,
      data: bootcamp,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Delete bootcamp
 * @route   DELETE /api/bootcamps/:id
 * @access  Private
*/
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({sucsess: true});
  } catch (err) {
    next(err);
  }
}
