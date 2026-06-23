const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// 1. CORS MUST be enabled for the FCC test runner to read the JSON response
app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 2. Configure Multer
const upload = multer({ storage: multer.memoryStorage() });

// 3. The API Endpoint
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  
  // LOGGING: Check your server console when you click "Run Tests"
  console.log("Test hit received...");
  console.log("Req.file:", req.file);

  // FAILURE SAFETY: If req.file is undefined, the test didn't send a file correctly
  if (!req.file) {
    console.log("No file received");
    return res.json({ error: "No file uploaded" });
  }

  // SUCCESS RESPONSE: Exactly matches Test 4 requirements
  const fileMetadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
  
  console.log("Sending response:", fileMetadata);
  res.json(fileMetadata);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
