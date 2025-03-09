import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.post('/webhook', (req: Request, res: Response) => {
    console.log('Received signature:', req.body);
    res.sendStatus(200);
});

app.get('/webhook', (req: Request, res: Response) => {
    res.send('Webhook server is up and awaiting POST requests!');
});


app.listen(4000, () => console.log('Webhook server running on port 4000'));
