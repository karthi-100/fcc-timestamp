// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  let date = new Date();
  let UTC = date.getTime();
  UTC = new Date(UTC);
  UTS = UTC.toUTCString();
  let UNIX = date.getTime();
  res.json({ unix: UNIX, utc: UTS });
});
app.get("/api/:date", function (req, res) {
  if (req.params.date === "" || req.params.date === undefined) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  }

  const date = new Date(req.params.date);
  if (date.toString() === "Invalid Date") {
    const date2 = new Date(parseInt(req.params.date, 10));
    if (date2.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }
    return res.json({
      unix: date2.getTime(),
      utc: date2.toUTCString(),
    });
  }
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
