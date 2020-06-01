const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Configuration = require('./utils/envhandler');
const routes = require('./routes');
const path = require('path');
const PORT = process.env.PORT || Configuration.PORT;

// Initializing app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Setting cors
app.use(cors());


// app.use(logger("dev"));


// Load the routes
routes(app);

//for static client file
app.use(express.static(path.join(__dirname, '../client', 'build')));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client','build', 'index.html'));
});

// Starting the server
app.listen(PORT, () => {
	console.info('Node server listening on port ' + PORT);
});
