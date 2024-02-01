// Require necessary modules
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

// Set up sessions with cookies
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,                                     // Milliseconds
        httpOnly: true,                                     // Prevents client-side JavaScript from reading the cookie
        secure: false,                                      // True if using HTTPS
        sameSite: 'strict',                                 // Strict same-site policy to mitigate CSRF attacks
    },
    resave: false,                                         // Prevents re-saving the session if nothing has changed
    saveUninitialized: true,                               // Forces a session that is "uninitialized" to be saved to the store    
    store: new SequelizeStore({                            // Store the session in the database using Sequelize    
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