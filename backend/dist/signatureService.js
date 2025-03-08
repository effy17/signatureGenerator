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
exports.renderSignature = renderSignature;
const nunjucks_1 = __importDefault(require("nunjucks"));
const path_1 = __importDefault(require("path"));
// Configure Nunjucks to use the templates directory
nunjucks_1.default.configure(path_1.default.join(__dirname, 'templates'), { autoescape: true });
function renderSignature(templateId, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const templateFile = `${templateId}.html`;
        return new Promise((resolve, reject) => {
            nunjucks_1.default.render(templateFile, userData, (err, res) => {
                if (err) {
                    reject(err);
                }
                else if (res === null) {
                    reject(new Error("Template rendering returned null"));
                }
                else {
                    resolve(res);
                }
            });
        });
    });
}
