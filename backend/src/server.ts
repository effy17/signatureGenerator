import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { renderSignature } from './signatureService';
import { addJobToQueue } from './jobQueue';

interface UserData {
    fullName: string;
    email: string;
    phone?: string;
    logo?: string;
}

interface BulkRequestBody {
    templateId: string;
    listOfUserData: UserData[];
    callbackUrl: string;
}

const app = express();
app.use(bodyParser.json());

app.post('/generate-signature', async (req: Request, res: Response) => {
    const { templateId, userData } = req.body as { templateId: string; userData: UserData };
    try {
        const htmlSignature = await renderSignature(templateId, userData);
        // Convert HTML to plain text (basic conversion)
        const plainTextSignature = htmlSignature.replace(/<\/?[^>]+(>|$)/g, "");
        res.json({ htmlSignature, plainTextSignature });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate signature' });
    }
});

app.post('/generate-signatures-bulk', async (req: Request, res: Response) => {
    const { templateId, listOfUserData, callbackUrl } = req.body as BulkRequestBody;
    try {
        listOfUserData.forEach((userData: UserData) => {
            addJobToQueue({ templateId, userData, callbackUrl });
        });
        res.json({ message: 'Jobs submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Bulk processing failed' });
    }
});

app.get('/templates', (req: Request, res: Response) => {
    const templates = [
        { id: 'template1', name: 'Classic Template' },
        { id: 'template2', name: 'Modern Template' },
        { id: 'template3', name: 'Professional sidebar' },
        { id: 'template4', name: 'Two column Header' }
    ];
    res.json(templates);
});

app.listen(3000, () => {
    console.log('Backend running on port 3000');
});
