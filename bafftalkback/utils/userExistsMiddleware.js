const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'You need to be logged in to access this resource.',
    });
  }
};

module.exports = isLoggedIn;
