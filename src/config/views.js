module.exports = {
  views: {
    layout: 'layouts/layout', // Default layout for other pages
  },

  // Disable layout for login page
  locals: function(req, res, next) {
    if (req.url === 'http://localhost:1337/login') {
      res.locals.layout = false;
    }
    return next();
  }
};
