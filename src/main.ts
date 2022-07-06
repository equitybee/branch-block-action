import * as core from '@actions/core';

import { context, getOctokit } from '@actions/github';
import { blockBranch } from './octokit-queries';

const run = async (): Promise<void> => {
  try {
    const branchName = core.getInput('branch-name', { required: true });
    const users = core.getMultilineInput('users', { required: true });
    const teams = core.getMultilineInput('teams', { required: true });
    const apps = core.getMultilineInput('apps', { required: true });

    // Get author, PR number from context
    const pullRequest = context.payload.pull_request;

    if (!pullRequest) {
      core.debug('Could not get pull request from context');

      return;
    }

    const owner = context.repo.owner;
    const repo = context.repo.repo;

    const token = core.getInput('repo-token', { required: true });
    const octokit = getOctokit(token);

    // Get all teams in the organization where the PR author is a member
    await blockBranch(octokit, owner, repo, branchName, users, teams, apps);
  } catch (error) {
    if (error instanceof Error) {
      core.error(error);
      core.setFailed(error.message);
    }
  }
};

run();
