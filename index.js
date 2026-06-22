const port = 3000;
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer().single('upfile');

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.post('/api/fileanalyse', upload, (req, res) => {
  if (req.file) {
    const { originalname: name, mimetype: type, size } = req.file;
    res.json({ name, type, size });
  } else {
    res.json({ error: 'no file selected' });
  }
});

app.listen(port);
console.log(`Listening on port ${port}`);