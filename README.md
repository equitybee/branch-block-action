# Block Branch Access Action

Use this Github action to automatically add a label to PRs based on the teams the PR author belongs to.

## Why did we build this?

At [EquityBee](https://equitybee.com/), we use trunk based development methodology. We have a CI process that we run on our trunk branch that includes multiple test phases before releasing a version. During this period of time we want to disable the option to add new features as this will break the tests that currently run.
With this action we automatically block the access when a release PR is opened.

## How to use

Under `.github/workflows` create a new `.yml` file to run the action on every PR:

```yaml
name: Block Access to Branch
on:
  pull_request:
    branches:
      - main

jobs:
  block_branch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: equitybee/branch-block-action@main
        with:
          repo-token: ${{ secrets.TOKEN }}
          branch-name: YOUR_BRANCH_NAME
          users: USERS_WITH_ACCESS
          teams: TEAMS_WITH_ACCESS
          apps: APPS_WITH_ACCESS
```

Make sure to add the relevant inputs:

- `repo-token` is your `${{ secrets.GITHUB_TOKEN }}`. You may encounter an error where this token does not have the necessary permissions to access an organization or teams. At EquityBee, we use PATs (Personal Access Token) instead. Create a [personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) with the repo or public_repo scopes enabled, and add the token as an [encrypted secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) for the repository or organization
- `branch-name` is the name/slug of the branch that you will block access to
- `users` is an array of user names that will have access after the block. Empty array will block access to everyone.
- `teams` is an array of team names that will have access after the block. Empty array will block access to everyone.
- `apps` is an array of app names that will have access after the block. Empty array will block access to everyone.

## Next steps

- [ ] add tests

## License

Apache-2 © EquityBee
