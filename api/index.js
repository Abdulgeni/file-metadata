const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path'); // Added for safer file routing
require('dotenv').config();

const app = express();

app.use(cors());

// 1. Fixed for Vercel: Use path.join to avoid location errors
app.use('/public', express.static(path.join(__dirname, '../public')));

// 2. Configure Multer to use Memory Storage (Crucial for Vercel!)
// Vercel is Read-Only. You cannot write uploaded files to disk.
const upload = multer({ storage: multer.memoryStorage() });

// 3. Fixed for Vercel: Serve HTML page safely
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// 4. API End Point
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// 5. Fixed for Vercel: Wrap app.listen so it doesn't block the function execution
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

// 6. CRITICAL FOR VERCEL: Export the app module
module.exports = app;
