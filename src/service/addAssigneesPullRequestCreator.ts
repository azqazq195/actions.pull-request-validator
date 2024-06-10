import * as core from '@actions/core'
import * as github from '@actions/github'
import {Inputs} from "../context";

export async function addAssigneesPullRequestCreator(inputs: Inputs) {
    core.startGroup('AddAssigneesPullRequestCreator');
    const octokit = github.getOctokit(inputs.token)


    const pr = github.context.payload.pull_request;
    if (!pr) {
        core.setFailed('Pull Request 정보를 찾을 수 없습니다.')
        return
    }

    if(!pr.user) {
        core.setFailed('Pull Request 생성자 정보를 찾을 수 없습니다.')
        return
    }

    const prCreator = pr.user.login

    try {
        await octokit.rest.issues.addAssignees({
            owner: inputs.owner,
            repo: inputs.repo,
            issue_number: inputs.prNumber,
            assignees: [prCreator]
        })
    } catch (error: any) {
        core.setFailed('Pull Request 담당자 등록 실패.')
        return
    }

    core.info(`PR 생성자 @${prCreator}를 이슈 #${inputs.prNumber}의 담당자로 지정하였습니다.`)
    core.endGroup()
}