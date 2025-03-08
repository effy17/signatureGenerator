import Bull from 'bull';
import { renderSignature } from './signatureService';
import axios from 'axios';

interface JobData {
    templateId: string;
    userData: any;
    callbackUrl: string;
}

const signatureQueue = new Bull<JobData>('signatureQueue', {
    redis: { host: 'redis', port: 6379 }
});

signatureQueue.process(async (job) => {
    const { templateId, userData, callbackUrl } = job.data;

    try {
        const htmlSignature = await renderSignature(templateId, userData);

        const plainTextSignature = htmlSignature.replace(/<\/?[^>]+(>|$)/g, '');

        await axios.post(callbackUrl, { htmlSignature, plainTextSignature });

        console.log(`Successfully sent signature to ${callbackUrl}`);
    } catch (error) {
        console.error('Error processing job:', error);
        throw error;
    }
});

export function addJobToQueue(data: JobData) {
    signatureQueue.add(data);
}
