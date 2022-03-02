"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOWNLOAD_COMMENT = exports.ACTION_PATH = exports.GITHUB_BASE_PATH = exports.ARTIFACT_NAME = void 0;
exports.ARTIFACT_NAME = 'webpack-bundle-analyzer Report';
exports.GITHUB_BASE_PATH = 'https://github.com';
exports.ACTION_PATH = `${exports.GITHUB_BASE_PATH}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
exports.DOWNLOAD_COMMENT = 'Download the webpack-bundle-analyzer result';
