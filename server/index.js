const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');

// to use the express routes
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const adminRouter = require('./routes/adminRoutes');
const suburbRouter = require('./routes/suburbRoutes');
const propertyRouter = require('./routes/propertyRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');

// connecting to MongoDB
console.log('connecting to mongoDB');

mongoose
  .connect(config.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

app.use(cors()); // enable cross-origin source
app.use(bodyParser.json()); // extract entire body-portion of the request stream and expose it in request.body
app.use(middleware.requestLogger); // log all requests
app.use(middleware.tokenExtractor); // get token from request's body
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/suburb', suburbRouter);
app.use('/property', propertyRouter);
app.use('/wishlist', wishlistRouter);
app.use(middleware.unknownEndpoint); // in case requests are from unknown endpoint
app.use(middleware.errorHandler); // handle common error

// Connecting server port
app.listen(config.PORT || 8081, () => {
  console.log(`Server is running on port: ${config.PORT}`);
});

module.exports = app;
