/**
 * Get all bootcamps
 * @route   GET /api/bootcamps
 * @access  Public
*/
exports.getBootcamps = (req, res, next) => {
	res
		.status(200)
		.json({
			sucsess: true,
			message: 'Get all bootcamps',
		});
}

/**
 * Get single bootcamp
 * @route   GET /api/bootcamps/:id
 * @access  Public
*/
exports.getBootcamp = (req, res, next) => {
	res
    .status(200)
    .json({
      sucsess: true,
      message: `Get bootcamp ${req.params.id}`,
    });
}

/**
 * Create new bootcamp
 * @route   POST /api/bootcamps
 * @access  Private
*/
exports.createBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({
      sucsess: true,
      message: 'Create new bootcamp',
    });
}

/**
 * Update bootcamp
 * @route   PUT /api/bootcamps/:id
 * @access  Private
*/
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({
      sucsess: true,
      message: `Update bootcamp  ${req.params.id}`,
    });
}

/**
 * Delete bootcamp
 * @route   DELETE /api/bootcamps/:id
 * @access  Private
*/
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({
      sucsess: true,
      message: `Delete bootcamp  ${req.params.id}`,
    });
}
