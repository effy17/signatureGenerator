import nunjucks from 'nunjucks';
import path from 'path';

interface UserData {
    fullName: string;
    email: string;
    phone?: string;
    logo?: string;
}

nunjucks.configure(path.join(__dirname, 'templates'), { autoescape: true });

export async function renderSignature(templateId: string, userData: UserData): Promise<string> {
    const templateFile = `${templateId}.html`;
    return new Promise((resolve, reject) => {
        nunjucks.render(templateFile, userData, (err: Error | null, res: string | null) => {
            if (err) {
                reject(err);
            } else if (res === null) {
                reject(new Error("Template rendering returned null"));
            } else {
                resolve(res);
            }
        });
    });
}
