import * as core from '@actions/core'
import {Inputs} from "../context";

export async function validatePullRequest(inputs: Inputs) {
    core.startGroup('ValidatePullRequest')
    if (inputs.pullRequestTitleRegex) {

    }

    if (inputs.branchNameRegex) {

    }

    if (inputs.commitMessageRegex) {

    }
    core.endGroup()
}

export async function checkPullRequestTitle(inputs: Inputs) {
    if (!inputs.pullRequestTitleRegex) {

    }

}

export async function checkBranchName(inputs: Inputs) {

}

export async function checkCommitMessage(inputs: Inputs) {

}