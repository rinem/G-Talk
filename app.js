const express = require('express');
const mongoose = require('mongoose');

const app = express();

// EJS
app.use(express.static('public'));
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
