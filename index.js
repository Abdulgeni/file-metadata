const express = require("express");
const multer  = require("multer");
const cors    = require("cors");
const path    = require("path");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));

// Serve the provided index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Store upload in memory — no disk writes needed
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/fileanalyse — returns name, type, size
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  const { originalname, mimetype, size } = req.file;
  res.json({ name: originalname, type: mimetype, size });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});