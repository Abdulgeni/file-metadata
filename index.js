const express = require('express');
const multer = require('multer');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/fileanalyse', multer().single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port ' + listener.address().port);
});