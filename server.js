const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/apiroute.js');

const PORT = process.env.PORT || 3001;

//creating the server 
const app = express();

// Import custom middleware, "cLog"
// modify the server adding some flavors
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
// 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing API routes to the server, adding /api to all their URLs
app.use('/api', api);

// send the entire public to the broswer to create the front end
app.use(express.static('public'));

// HTML routes 
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a 404 page
// always put in the bottom 
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);