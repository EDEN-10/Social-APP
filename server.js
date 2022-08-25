const mongoose = require("mongoose");
const express = require('express');
const PORT = process.env.PORT || 3001;
const routes = require('./API routes');
const sequelize = require('./db/connection');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-app-api", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
});
mongoose.set("debug", true);
//sets up these routes on a base '/' route for your site
app.use(require('./API routes'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));














