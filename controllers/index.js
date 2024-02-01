// Importing Express's router and route modules
const router = require("express").Router();
const apiRoutes = require("./api");
const viewRoutes = require("./viewRoutes");

// Registering API routes with '/api' prefix
router.use("/api", apiRoutes);

// Registering View routes (no specific prefix, defaults to '/')
router.use(viewRoutes);

// Exporting the configured router for use in the application
module.exports = router;
