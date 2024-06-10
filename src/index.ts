import * as context from './context';
import {checkClosingIssuesReferences} from "./service/checkClosingIssuesReferences";
import {addAssigneesPullRequestCreator} from "./service/addAssigneesPullRequestCreator";
import {getGraphqlClient} from "./graphqlClient";

async function run(): Promise<void> {
    const inputs: context.Inputs = await context.getInputs();

    console.log(inputs)

    // PR에 연결된 Issue 확인
    await checkClosingIssuesReferences(inputs);

    // PRCreate 담당자 등록
    await addAssigneesPullRequestCreator(inputs);
}


run();