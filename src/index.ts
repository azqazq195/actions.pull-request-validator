import * as context from './context';
import {checkClosingIssuesReferences} from "./service/checkClosingIssuesReferences";
import {addAssigneesPullRequestCreator} from "./service/addAssigneesPullRequestCreator";
import * as core from '@actions/core'

async function run(): Promise<void> {
    const inputs: context.Inputs = await context.getInputs();

    console.log('actions 시작')
    console.log(inputs.prNumber)
    console.log(inputs.prNumber)


    core.startGroup("info")
    core.info(inputs.owner)
    core.info(inputs.repo)
    core.info(String(inputs.prNumber))
    core.info(inputs.token)
    core.endGroup()

    // PR에 연결된 Issue 확인
    await checkClosingIssuesReferences(inputs);

    // PRCreate 담당자 등록
    await addAssigneesPullRequestCreator(inputs);
}


run();