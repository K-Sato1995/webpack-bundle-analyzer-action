"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructMDTable = exports.formatBytes = exports.isJS = exports.webpackStatsJson = void 0;
const webpackStatsJson = (pathToStatsJson
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => __awaiter(void 0, void 0, void 0, function* () {
    const { default: jsonData } = yield Promise.resolve().then(() => __importStar(require(pathToStatsJson)));
    return JSON.parse(JSON.stringify(jsonData));
});
exports.webpackStatsJson = webpackStatsJson;
const isJS = (fileName) => {
    return fileName.split('.').pop() === 'js';
};
exports.isJS = isJS;
const formatBytes = (bytes, decimals = 2) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let i = 0;
    for (i; bytes > 1024; i++) {
        bytes /= 1024;
    }
    return `${parseFloat(bytes.toFixed(decimals))} ${units[i]}`;
};
exports.formatBytes = formatBytes;
const constructMDTable = (dataRows) => {
    const rowStrs = dataRows.map(({ name, size }) => {
        return `| \`${name}\` | ${formatBytes(size)} |`;
    });
    return `
  | Name | Bundle Size(Parsed)  |
  | ------ | ------ |
  ${rowStrs.join('\n')}`;
};
exports.constructMDTable = constructMDTable;
