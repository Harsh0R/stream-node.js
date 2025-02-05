const express = require("express");
const fs = require("fs");
const status = require("express-status-monitor");
const zlib = require("zlib")

const app = express();
const PORT = 9000;

app.use(status());

fs.createReadStream("./sample.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./sample.zip")))

app.get("/", (req, res) => {
  const stream = fs.createReadStream("./sample.txt", "utf-8");
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
//   fs.readFile("./sample.txt", (err, data) => {
//     res.end(data);
//   });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
