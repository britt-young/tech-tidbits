// Import necessary modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utlis/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize the Express application
const app = express();

// Set the port from environment variables or default to 3001
const PORT = process.env.PORT || 3001;

// Set up Handlebars with custom helpers
const hbs = exphbs.create({ helpers });

// Session configuration
const sess = {
    secret: 'Super secret secret', // Secret for signing the session ID cookie
    cookie: {
        maxAge: 300000, // Cookie expiration time in milliseconds
        httpOnly: true, // Prevents client-side JavaScript from reading the cookie
        secure: false, // True if using HTTPS
        sameSite: 'strict', // Strict same-site policy to mitigate CSRF attacks
    },
    resave: false, // Avoids resaving sessions that haven't been modified
    saveUninitialized: true, // Saves new sessions even if not modified
    store: new SequelizeStore({ // Session store using Sequelize
        db: sequelize
    })
};

// Apply the session middleware to the application
app.use(session(sess));

// Set up Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and use application routes
app.use(routes);

// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});