const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();

// Use memory storage — no disk writes
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  const name = req.file.originalname;
  const type = req.file.mimetype;
  const size = req.file.size;

  res.json({ name, type, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Listening on port " + port);
});