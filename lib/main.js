"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const core = __importStar(require("@actions/core"));
const github_1 = require("@actions/github");
const octokit_queries_1 = require("./octokit-queries");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branchName = core.getInput('branch-name', { required: true });
        const users = core.getMultilineInput('users', { required: true });
        const teams = core.getMultilineInput('teams', { required: true });
        const apps = core.getMultilineInput('apps', { required: true });
        // Get author, PR number from context
        const pullRequest = github_1.context.payload.pull_request;
        if (!pullRequest) {
            core.debug('Could not get pull request from context');
            return;
        }
        const owner = github_1.context.repo.owner;
        const repo = github_1.context.repo.repo;
        const token = core.getInput('repo-token', { required: true });
        const octokit = (0, github_1.getOctokit)(token);
        // Get all teams in the organization where the PR author is a member
        yield (0, octokit_queries_1.blockBranch)(octokit, owner, repo, branchName, users, teams, apps);
    }
    catch (error) {
        if (error instanceof Error) {
            core.error(error);
            core.setFailed(error.message);
        }
    }
});
run();
