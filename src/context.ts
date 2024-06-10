import * as core from '@actions/core';
import * as github from "@actions/github";

export interface Inputs {
    token: string;
    owner: string;
    repo: string;
    prNumber: number;
    pullRequestTitleRegex: string | undefined;
    branchNameRegex: string | undefined;
    commitMessageRegex: string | undefined;
}

export async function getInputs(): Promise<Inputs> {
    return {
        token: core.getInput('token'),
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        prNumber: github.context.issue.number,
        pullRequestTitleRegex: core.getInput('pull-request-title-regex') || undefined,
        branchNameRegex: core.getInput('branch-name-regex') || undefined,
        commitMessageRegex: core.getInput('commit-message-regex') || undefined,
    };
}