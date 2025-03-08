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
exports.addJobToQueue = addJobToQueue;
// src/jobQueue.ts
const bull_1 = __importDefault(require("bull"));
const signatureService_1 = require("./signatureService");
const axios_1 = __importDefault(require("axios"));
// Create a Bull queue, backed by Redis
const signatureQueue = new bull_1.default('signatureQueue', {
    redis: { host: 'redis', port: 6379 }
});
// Process jobs from the queue
signatureQueue.process((job) => __awaiter(void 0, void 0, void 0, function* () {
    const { templateId, userData, callbackUrl } = job.data;
    const htmlSignature = yield (0, signatureService_1.renderSignature)(templateId, userData);
    const plainTextSignature = htmlSignature.replace(/<\/?[^>]+(>|$)/g, "");
    // Simulate sending result to a webhook (callbackUrl)
    yield axios_1.default.post(callbackUrl, { htmlSignature, plainTextSignature });
}));
// Function to add a job to the queue
function addJobToQueue(data) {
    signatureQueue.add(data);
}
