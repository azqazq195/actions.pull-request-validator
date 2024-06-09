"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkClosingIssuesReferences = void 0;
const graphqlClient_1 = require("../graphqlClient");
function checkClosingIssuesReferences(inputs) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const graphqlWithAuth = yield (0, graphqlClient_1.getGraphqlClient)();
        const response = yield graphqlWithAuth(linkedBranchesQuery, {
            repoOwner: inputs.owner,
            repoName: inputs.repo,
            prNumber: inputs.prNumber,
        });
        const closingIssues = response.repository.pullRequest.closingIssuesReferences.nodes;
        if (closingIssues.length <= 0) {
            console.log("연결된 issue 가 없음.");
        }
    });
}
exports.checkClosingIssuesReferences = checkClosingIssuesReferences;
