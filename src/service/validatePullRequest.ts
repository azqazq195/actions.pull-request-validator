import * as core from '@actions/core'
import * as github from '@actions/github'
import {Inputs} from "../context";

export async function validatePullRequest(inputs: Inputs) {
    core.startGroup('ValidatePullRequest')
    await checkPullRequestTitle(inputs)
    await checkBranchName(inputs)
    await checkCommitMessage(inputs)
    core.endGroup()
}

async function checkPullRequestTitle(inputs: Inputs) {
    if (!inputs.pullRequestTitleRegex) {
        core.info('Skip check pull request title.')
        return
    }

    const prTitle = github.context.payload.pull_request?.title;
    if (!prTitle) {
        core.setFailed('Pull request title 을 찾을 수 없습니다.');
        return
    }

    const regex = new RegExp(inputs.pullRequestTitleRegex!!);
    if (!regex.test(prTitle)) {
        core.setFailed(`Pull request title '${prTitle}'이 패턴 '${inputs.pullRequestTitleRegex}'에 맞지 않습니다.`);
        return
    }

    core.info(`Pull request title 패턴 검사 ✅`);
}

async function checkBranchName(inputs: Inputs) {
    if (!inputs.branchNameRegex) {
        core.info('Skip check branch name.')
        return
    }

    const branchName = github.context.payload.pull_request?.head.ref;
    if (!branchName) {
        core.setFailed('Branch name 을 찾을 수 없습니다.');
        return
    }

    const regex = new RegExp(inputs.branchNameRegex!!);
    if (!regex.test(branchName)) {
        core.setFailed(`Branch name '${branchName}'이 패턴 '${inputs.branchNameRegex}'에 맞지 않습니다.`);
        return
    }

    core.info(`Branch name 패턴 검사 ✅`);
}

async function checkCommitMessage(inputs: Inputs) {
    if (!inputs.commitMessageRegex) {
        core.info('Skip check commit message.')
        return
    }

    const commits = await github.getOctokit(inputs.token).rest.pulls.listCommits({
        owner: inputs.owner,
        repo: inputs.repo,
        pull_number: inputs.prNumber,
    });

    const regex = new RegExp(inputs.commitMessageRegex!!);
    const invalidMessages: string[] = [];

    commits.data.forEach(commit => {
        if (!regex.test(commit.commit.message)) {
            invalidMessages.push(commit.commit.message);
        }
    });

    if (invalidMessages.length > 0) {
        core.setFailed(`아래 commit message 들이 패턴 '${inputs.commitMessageRegex}'에 맞지 않습니다.\n - ${invalidMessages.join('\n')}`);
        return
    }

    core.info(`Commit message 패턴 검사 ✅`);
}