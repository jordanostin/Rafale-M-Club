const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello depuis le backend 🚀");
});

app.listen(PORT, () => {
  console.log(`Backend en route sur http://localhost:${PORT}`);
});