import {Inputs} from "../context";
import {getGraphqlClient} from "../graphqlClient";
import * as core from '@actions/core'

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

export async function checkClosingIssuesReferences(inputs: Inputs) {
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

    core.startGroup('CheckClosingIssuesReferences');
    core.info('PR에 연결된 issue 검색 시작')

    const graphqlWithAuth = await getGraphqlClient()
    const response: GetClosingIssuesReferences = await graphqlWithAuth(linkedBranchesQuery, {
        repoOwner: inputs.owner,
        repoName: inputs.repo,
        prNumber: inputs.prNumber,
    });

    const closingIssues = response.repository.pullRequest.closingIssuesReferences.nodes;

    if (closingIssues.length <= 0) {
        core.setFailed('연결된 issue 가 없음.')
        console.log("연결된 issue 가 없음.")
    }

    core.info('PR에 연결된 issue 검색 종료')
    core.endGroup()
}
