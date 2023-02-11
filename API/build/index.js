"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middelware que transforma la req.body a un json
const PORT = 3000;
app.get("/ping", (_req, res) => {
    console.log("Hello! I feel the PING!");
    res.status(200).send("OK");
});
app.listen(PORT, () => {
    console.log("Server has started on port: " + PORT);
});
