import * as core from '@actions/core';
import * as github from "@actions/github";

export interface Inputs {
    token: string;
    owner: string;
    repo: string;
    prNumber: number;
}

export async function getInputs(): Promise<Inputs> {
    return {
        token: process.env.GITHUB_TOKEN || '',
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        prNumber: github.context.issue.number
    };
}