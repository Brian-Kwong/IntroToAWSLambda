"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const words_1 = require("./words.cjs");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // for parsing application/json
app.use((0, cors_1.default)()); // adds cors headers
// Gets a word form the daily wordle set
app.get("/word", (req, res) => {
    const word = (0, words_1.pickRandomWord)();
    res.send({
        word: word
    });
});
// Checks if a word is correct
app.post('/word', (req, res) => {
    const body = req.body;
    if (body === undefined) {
        res.status(401).send({
            anwser: "Invalid body"
        });
    }
    const word = body.word;
    if (word === undefined || word.length !== 5) {
        res.status(401).send({
            anwser: "Invalid word"
        });
    }
    res.send({
        anwser: (0, words_1.checkWord)(word)
    });
});
exports.handler = (0, serverless_http_1.default)(app);
