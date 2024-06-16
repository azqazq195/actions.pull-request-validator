import * as core from '@actions/core'
import {Inputs} from "../context";
import {getGraphqlClient} from "../graphqlClient";
import * as github from "@actions/github";

interface GetClosingIssuesReferences {
    repository: {
        pullRequest: {
            closingIssuesReferences: {
                nodes: {
                    id: string;
                    number: number;
                    title: string;
                }[];
            };
        };
    };
}

const linkedBranchesQuery = `
      query GetClosingIssuesReferences($repoOwner: String!, $repoName: String!, $prNumber: Int!) {
        repository(owner: $repoOwner, name: $repoName) {
          pullRequest(number: $prNumber) {
            closingIssuesReferences(first: 1) {
              nodes {
                id
                number
                title
              }
            }
          }
        }
      }
    `;

const autoResolvedSectionTitle = "## 🤖 Github Action Bot (DO NOT EDIT)"

export async function checkClosingIssuesReferences(inputs: Inputs) {
    core.startGroup('CheckClosingIssuesReferences');

    const graphqlWithAuth = await getGraphqlClient()
    const response: GetClosingIssuesReferences = await graphqlWithAuth(linkedBranchesQuery, {
        repoOwner: inputs.owner,
        repoName: inputs.repo,
        prNumber: inputs.prNumber,
    });

    const closingIssues = response.repository.pullRequest.closingIssuesReferences.nodes;

    if (closingIssues.length <= 0) {
        core.setFailed('연결된 issue 가 없음.')
        core.endGroup()
        return
    }
    core.info('PR에 issue 연결 ✅')

    // 현재 PR의 본문 가져오기
    const pullRequest = github.context.payload.pull_request;
    if (!pullRequest) {
        core.setFailed('PR 정보를 가져올 수 없습니다.');
        core.endGroup()
        return;
    }

    if (!pullRequest.body) {
        core.setFailed('PR 본문을 가져올 수 없습니다.');
        core.endGroup()
        return;
    }

    // 연결된 이슈 번호 추출
    const issueNumbers = closingIssues.map(issue => issue.number);
    const resolvedText = issueNumbers.map(number => `- resolved #${number}`).join('\n');

    // "### Github Action Bot (DO NOT EDIT)" 섹션 찾기
    const botSectionStart = pullRequest.body.indexOf(autoResolvedSectionTitle);
    let updatedBody: string;

    if (botSectionStart === -1) {
        // "### Github Action Bot (DO NOT EDIT)" 섹션이 없으면 추가
        updatedBody = `${pullRequest.body}\n\n${autoResolvedSectionTitle}\n${resolvedText}`;
    } else {
        // "### Github Action Bot (DO NOT EDIT)" 섹션이 있으면 해당 섹션부터 끝까지 교체
        updatedBody = `${pullRequest.body.substring(0, botSectionStart)}\n\n### Github Action Bot (DO NOT EDIT)\n${resolvedText}`;
    }

    // PR 본문 업데이트
    await github.getOctokit(core.getInput('token')).rest.pulls.update({
        owner: inputs.owner,
        repo: inputs.repo,
        pull_number: inputs.prNumber,
        body: updatedBody,
    });

    core.info('PR 본문 업데이트 완료 ✅');
    core.endGroup()
}
