const http = require("http");
const fs = require("fs");


const delay = (ms) => {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

// const readFile = (path) => {
//     return new Promise(() => {
//         fs.readFile(path, (err, data) => {
//             if (err) {
//               res.write(" Error");
//               res.end();
//             } else {
//               res.write(data);
//               res.end();
//             }
//     })
// }

const rearFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const server = http.createServer(async (req, res) => {
  switch (req.url) {
    case "/home":
    try{
        const data = await rearFile("pages/0about.html");
        await delay(4000);
        res.write(data);
        res.end();
    }catch(e){
        console.log("Something wrong....")
        res.end();

    }
      

      break;
    case "/about":
      await delay(4000);
      res.write("About course");
      res.end();
      break;
    default:
      res.write("Error");
      res.end();

  }
});
server.listen(3003);
