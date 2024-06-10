import * as context from './context';
import * as core from '@actions/core'

import {checkClosingIssuesReferences} from "./service/checkClosingIssuesReferences";

async function run(): Promise<void> {
    const inputs: context.Inputs = await context.getInputs();

    // 3/4 bit
    core.info('\u001b[35mThis foreground will be magenta')

// 8 bit
    core.info('\u001b[38;5;6mThis foreground will be cyan')

// 24 bit
    core.info('\u001b[38;2;255;0;0mThis foreground will be bright red')


    core.error('This is a bad error, action may still succeed though.')

    core.warning('Something went wrong, but it\'s not bad enough to fail the build.')

    core.notice('Something happened that you might want to know about.')

    // PR에 연결된 Issue 확인
    // await checkClosingIssuesReferences(inputs);

    // PRCreate 담당자 등록 -> issue 를 타고 확인 가능하기 때문에 필요한가?
    // await addAssigneesPullRequestCreator(inputs);
}


run().then(r => r);