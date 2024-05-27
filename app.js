const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');
require('dotenv').config();

const app = express();
const port = 3001

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');

// Routes
const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');
const aboutRouter = require('./routes/about');
const solutionsRouter = require('./routes/solutions');
const adminRouter = require('./routes/admin');

app.use('/', indexRouter);
app.use('/', contactRouter);
app.use('/', aboutRouter);
app.use('/', solutionsRouter);
app.use('/', adminRouter);

// Sync database and start server
db.sequelize.sync().then(() => {
    app.listen(process.env.port || port, () => { console.log('Server is running on $(port)'); });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
