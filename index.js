const express = require('express');
const cors = require('cors');
const multer = require('multer'); // 1. Import multer
require('dotenv').config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// 2. Configure Multer to use memory storage (prevents writing files to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/**
 * 3. File Analysis Endpoint
 * The freeCodeCamp automated tests expect the file input 
 * field to have the 'name' attribute set to 'upfile'.
 */
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    // If no file was uploaded, return an error
    if (!req.file) {
      return res.json({ error: 'Please upload a file' });
    }

    // 4. Extract required metadata and return the JSON object
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
