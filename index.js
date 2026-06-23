const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// 1. Cross-Origin Resource Sharing configuration for the FCC test suite
app.use(cors());

// 2. Serve static files from the public folder
app.use('/public', express.static(process.cwd() + '/public'));

// 3. Configure multer to parse files into memory buffers instead of writing to disk
const upload = multer({ storage: multer.memoryStorage() });

// 4. Main HTML UI page route
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/**
 * 5. FILE METADATA MICROSERVICE ENDPOINT
 * Handles the 'upfile' payload sent by the freeCodeCamp test runner.
 */
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;

  // Prevent crashes if the test runner sends an empty or malformed payload
  if (!file) {
    return res.status(400).json({ error: 'Please select or upload a valid file' });
  }

  // Return the explicit metadata properties expected by test #4
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: Number(file.size)
  });
});

// 6. Define the network port and boot the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your microservice app is actively listening on port ' + port);
});
