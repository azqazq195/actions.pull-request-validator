"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const core = __importStar(require("@actions/core"));
const graphqlClient_1 = require("../graphqlClient");
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
function checkClosingIssuesReferences(inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        core.startGroup('CheckClosingIssuesReferences');
        core.info('PR에 연결된 issue 검색 시작');
        const graphqlWithAuth = yield (0, graphqlClient_1.getGraphqlClient)();
        const response = yield graphqlWithAuth(linkedBranchesQuery, {
            repoOwner: inputs.owner,
            repoName: inputs.repo,
            prNumber: inputs.prNumber,
        });
        const closingIssues = response.repository.pullRequest.closingIssuesReferences.nodes;
        if (closingIssues.length <= 0) {
            core.setFailed('연결된 issue 가 없음.');
        }
        core.info('PR에 연결된 issue 검색 종료');
        core.endGroup();
    });
}
exports.checkClosingIssuesReferences = checkClosingIssuesReferences;
//# sourceMappingURL=checkClosingIssuesReferences.js.map