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
/* eslint-disable sort-imports */
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const consts_1 = require("./consts");
const analyze_bundle_1 = require("./analyze-bundle");
const create_or_update_comment_1 = require("./create-or-update-comment");
const upload_artifact_1 = require("./upload-artifact");
const utils_1 = require("./utils");
function run() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const configPath = core.getInput('webpack-config-path', {
                required: true
            });
            const githubToken = core.getInput('github-token', {
                required: true
            });
            const reportFilename = core.getInput('report-file-name');
            const octokit = github.getOctokit(githubToken);
            const prNumber = (_a = github.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.number;
            yield (0, analyze_bundle_1.analyzeBundle)(configPath, reportFilename);
            yield (0, upload_artifact_1.uploadReport)(reportFilename);
            if (prNumber) {
                const pathToStats = `${process.env.GITHUB_WORKSPACE}/dist/stats.json`;
                const webpackStatsData = yield (0, utils_1.webpackStatsJson)(pathToStats);
                const jsFiles = webpackStatsData.assets.filter((asset) => (0, utils_1.isJS)(asset.name));
                const mdTable = (0, utils_1.constructMDTable)(jsFiles);
                const markdownComment = `
## Overview
${mdTable}
## Check the detail
[${consts_1.DOWNLOAD_COMMENT}](${consts_1.ACTION_PATH})
      `;
                yield (0, create_or_update_comment_1.createOrUpdateComment)(octokit, prNumber, markdownComment);
            }
            else {
                core.info('> No pull request found.');
            }
        }
        catch (error) {
            if (error instanceof Error)
                core.setFailed(error.message);
        }
    });
}
run();
