var express = require('express');
var cors = require('cors');
var multer = require('multer'); // Import multer
require('dotenv').config();

var app = express();

// 1. ENABLE CORS
// Crucial: The freeCodeCamp test runner needs this to read your API response.
app.use(cors());

// 2. SERVE STATIC ASSETS
app.use('/public', express.static(process.cwd() + '/public'));

// 3. CONFIGURE MULTER
// We use memoryStorage so we don't need to manage file permissions on disk.
const upload = multer({ storage: multer.memoryStorage() });

// 4. MAIN PAGE ROUTE
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/**
 * 5. API ENDPOINT: /api/fileanalyse
 * - Must use POST method.
 * - Must use 'upload.single("upfile")' because the HTML form uses name="upfile".
 */
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  
  // Debug: Log the file to see if the upload actually happened
  console.log(req.file);

  // validation: check if file exists
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // 6. RETURN JSON RESPONSE
  // The keys must strictly match: "name", "type", and "size"
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// 7. START SERVER
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
