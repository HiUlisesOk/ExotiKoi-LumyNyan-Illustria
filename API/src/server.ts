import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./routes/index";

const server = express();
// server.name = "API";

//   this line of code is using the body-parser middleware
//   to parse the body of incoming HTTP requests as URL-encoded data
//   with a maximum size of 50 megabytes.
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//   this line of code is using the body-parser middleware
//   to parse the body of incoming HTTP requests as JSON data
//   with a maximum size of 50 megabytes.
server.use(bodyParser.json({ limit: "50mb" }));

//   cookie-parser middleware to parse cookie data from incoming HTTP requests
//   and attach the resulting object to the "cookies" property of the request object
server.use(cookieParser());

// GO TO END OF THIS FILE TO SEE A DETAILED EXPLANATION *! - 1
server.use((req, res, next) => {
  // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "*"); // <---- THIS!
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", router);

// Error catching endware.
server.use((err: any, req: any, res: any, next: any) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default server;
/*
     *! - 1) The purpose of this middleware is to add headers to the response object
     that enable Cross-Origin Resource Sharing (CORS),
     which allows a web application running on one domain to access resources from another domain.

     The headers being set on the response object include:

     "Access-Control-Allow-Origin": set to "*", which allows requests from any domain

     "Access-Control-Allow-Credentials": set to "true", which allows the response to include credentials 
     such as cookies

     "Access-Control-Allow-Headers": set to "Origin, X-Requested-With, Content-Type, Accept", 
     which specifies which headers are allowed in a CORS request

     "Access-Control-Allow-Methods": set to "GET, POST, OPTIONS, PUT, DELETE", 
      which specifies which HTTP methods are allowed in a CORS request

     In summary, this line of code is defining a custom middleware function that adds 
     headers to the response object to enable CORS, allowing requests from any domain 
     and allowing the response to include credentials 
     and specifying which headers and HTTP methods are allowed.


*/
