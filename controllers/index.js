// Import Express router and route modules
const router = require('express').Router();
const apiRoutes = require('./api');
const routes = require('./api/routes');

// Register API routes with '/api' prefix
router.use('/api', apiRoutes);

// Register View routes
router.use(routes);

// Export the configured router for use in the application
module.exports = router;