import * as core from '@actions/core';
import { GitHub } from '@actions/github/lib/utils';

export const blockBranch = async (
  octokit: InstanceType<typeof GitHub>,
  owner: string,
  repo: string,
  branch: string,
  users: string[],
  teams: string[],
  apps: string[],
): Promise<boolean> => {
  const userAccessResponse = octokit.rest.repos.addUserAccessRestrictions({
    branch,
    owner,
    repo,
    users,
  });

  const teamAccessResponse = octokit.rest.repos.addTeamAccessRestrictions({
    branch,
    owner,
    repo,
    teams,
  });

  const appAccessResponse = octokit.rest.repos.addAppAccessRestrictions({
    branch,
    owner,
    repo,
    apps,
  });

  await Promise.all([userAccessResponse, teamAccessResponse, appAccessResponse]);

  return true;
};
