const { json, response } = require("express");
const http = require("http");

const todos = [
  { id: 1, text: "1 One" },
  { id: 2, text: "2 Two" },
  { id: 3, text: "3 Three" },
];

const server = http.createServer((req, res) => {
  //   res.setHeader("Content-Type", "application/json");
  //   res.setHeader("X-Powered-By", "Node.js");
  //   res.writeHead(404, {
  //     "Content-Type": "application/json",
  //     "X-Powred-By": "Node.js",
  //   });

  const { method, url } = req;
  let body = [];
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      let status = 404;
      const response = {
        success: false,
        result: [],
        eror: "",
      };
      if (method === "GET" && url === "/todos") {
        status = 200;
        response.success = true;
        response.result = todos;
      } else if (method === "POST" && url === "/todos") {
        const { id, text } = JSON.parse(body);
        if (!id || !text) {
          status = 400;
          response.eror = "pleas add id and text";
        } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.result = todos;
        }
      }
      res.writeHead(status, {
        "Content-Type": "application/json",
        "X-Powred-By": "Node.js",
      });
      res.end(JSON.stringify(response));
    });
  //   const data = JSON.stringify({
  //     succes: true,
  //     // succes: false,
  //     // data: todos,
  //     error: "Not Found",
  //     data: null,
  //   });

  //   res.end(data);
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
