"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const signatureService_1 = require("./signatureService");
const jobQueue_1 = require("./jobQueue");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Endpoint: Generate a single signature synchronously
app.post('/generate-signature', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { templateId, userData } = req.body;
    try {
        const htmlSignature = yield (0, signatureService_1.renderSignature)(templateId, userData);
        // Convert HTML to plain text (basic conversion)
        const plainTextSignature = htmlSignature.replace(/<\/?[^>]+(>|$)/g, "");
        res.json({ htmlSignature, plainTextSignature });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to generate signature' });
    }
}));
// Endpoint: Bulk signature generation (asynchronous)
app.post('/generate-signatures-bulk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { templateId, listOfUserData, callbackUrl } = req.body;
    try {
        listOfUserData.forEach((userData) => {
            (0, jobQueue_1.addJobToQueue)({ templateId, userData, callbackUrl });
        });
        res.json({ message: 'Jobs submitted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Bulk processing failed' });
    }
}));
// Endpoint: List available templates
app.get('/templates', (req, res) => {
    // In a real app, you might scan the templates folder.
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
