import express, { Request, Response } from 'express'
import cors from 'cors';
import serverless from 'serverless-http';
import {pickRandomWord, checkWord} from "./words";

const app  = express()
app.use(express.json()); // for parsing application/json
app.use(cors()); // adds cors headers

// Gets a word form the daily wordle set
app.get("/word", (req : Request, res : Response) => {
    const word = pickRandomWord()
    res.send({
        word : word
    });
});

// Checks if a word is correct
app.post('/word', (req : Request, res : Response) => {
    const body = req.body;
    if (body === undefined){
        res.status(401).send({
            anwser : "Invalid body"
        });
    }
    const word = body.word;
    if(word === undefined || word.length !== 5){
        res.status(401).send({
            anwser : "Invalid word"
        });
    }
    res.send({
        anwser : checkWord(word)
    });
}
)

export const handler = serverless(app)