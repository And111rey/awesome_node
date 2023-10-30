import express from "express"
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/samurais", (req, res) => {
  const a = 4;
  if (a > 5) {
    res.send("ok");

  } else {
    res.send("Hello samurai, hello world!!!!...>>>!!@@@@&&&&!");
  }
});
app.post("/samurais", (req, res) => {
  console.log("We created samurai");
  res.send("We created samurai!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
