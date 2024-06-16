import * as context from './context';
import {checkClosingIssuesReferences} from "./service/checkClosingIssuesReferences";
import {validatePullRequest} from "./service/validatePullRequest";
import * as github from "@actions/github";

async function run(): Promise<void> {
    const inputs: context.Inputs = await context.getInputs();

    // Validate Pull Request
    await validatePullRequest(inputs)

    // PR에 연결된 Issue 확인
    await checkClosingIssuesReferences(inputs);

    // PRCreate 담당자 등록 -> issue 를 타고 확인 가능하기 때문에 필요한가?
    // await addAssigneesPullRequestCreator(inputs);
}


run().then(r => r);