// const express = require('express');
//     const mongoose = require('mongoose');
//     const app = express();
//     const port = 3000;

//     // Middleware to parse JSON
//     app.use(express.json());

//     // Use your actual MongoDB Atlas connection string from the existing cluster
//     const mongoUri = 'mongodb+srv://shreyasreddy277:Shreyas23@cluster0.mongodb.net/Cluster0?retryWrites=true&w=majority';

//     mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(() => console.log('MongoDB connected'))
//         .catch(err => console.log(err));

//     // Start server
//     app.listen(port, () => {
//         console.log(`Server running on http://localhost:${port}`);
//     });