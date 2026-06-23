const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// USE MEMORY STORAGE (Critical for the FCC test environment)
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // 1. Log the file to server console to prove it arrived
  console.log("File received:", req.file);

  // 2. Handle missing file (prevents crash)
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  // 3. Return exact JSON format
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
