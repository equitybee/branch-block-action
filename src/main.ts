import * as core from '@actions/core';

import { context, getOctokit } from '@actions/github';
import { blockBranch } from './octokit-queries';

const run = async (): Promise<void> => {
  try {
    const branchName = core.getInput('branch-name', { required: true });
    const users = core.getInput('users', { required: true });
    const teams = core.getInput('teams', { required: true });
    const apps = core.getInput('apps', { required: true });

    const userArr = JSON.parse(users);
    const teamsArr = JSON.parse(teams);
    const appsArr = JSON.parse(apps);

    const owner = context.repo.owner;
    const repo = context.repo.repo;

    const token = core.getInput('repo-token', { required: true });
    const octokit = getOctokit(token);

    // Block the given branch for specific entities
    await blockBranch(octokit, owner, repo, branchName, userArr, teamsArr, appsArr);
  } catch (error) {
    if (error instanceof Error) {
      core.error(error);
      core.setFailed(error.message);
    }
  }
};

run();
