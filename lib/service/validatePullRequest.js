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
exports.validatePullRequest = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function validatePullRequest(inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        core.startGroup('ValidatePullRequest');
        yield checkPullRequestTitle(inputs);
        yield checkBranchName(inputs);
        yield checkCommitMessage(inputs);
        core.endGroup();
    });
}
exports.validatePullRequest = validatePullRequest;
function checkPullRequestTitle(inputs) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!inputs.pullRequestTitleRegex) {
            core.info('Skip check pull request title.');
            return;
        }
        const prTitle = (_a = github.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.title;
        if (!prTitle) {
            core.setFailed('Pull request title 을 찾을 수 없습니다.');
            return;
        }
        const regex = new RegExp(inputs.pullRequestTitleRegex);
        if (!regex.test(prTitle)) {
            core.setFailed(`Pull request title '${prTitle}'이 패턴 '${inputs.pullRequestTitleRegex}'에 맞지 않습니다.`);
            return;
        }
        core.info(`Pull request title 패턴 검사 ✅`);
    });
}
function checkBranchName(inputs) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!inputs.branchNameRegex) {
            core.info('Skip check branch name.');
            return;
        }
        const branchName = (_a = github.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.head.ref;
        if (!branchName) {
            core.setFailed('Branch name 을 찾을 수 없습니다.');
            return;
        }
        const regex = new RegExp(inputs.branchNameRegex);
        if (!regex.test(branchName)) {
            core.setFailed(`Branch name '${branchName}'이 패턴 '${inputs.branchNameRegex}'에 맞지 않습니다.`);
            return;
        }
        core.info(`Branch name 패턴 검사 ✅`);
    });
}
function checkCommitMessage(inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!inputs.commitMessageRegex) {
            core.info('Skip check commit message.');
            return;
        }
        const commits = yield github.getOctokit(inputs.token).rest.pulls.listCommits({
            owner: inputs.owner,
            repo: inputs.repo,
            pull_number: inputs.prNumber,
        });
        const regex = new RegExp(inputs.commitMessageRegex);
        const invalidMessages = [];
        commits.data.forEach(commit => {
            if (!regex.test(commit.commit.message)) {
                invalidMessages.push(`Commit SHA: ${commit.sha} - Message: ${commit.commit.message}`);
            }
        });
        if (invalidMessages.length > 0) {
            const message = [
                `아래 commit message 들이 패턴 '${inputs.commitMessageRegex}'에 맞지 않습니다:`,
                ...invalidMessages.map(msg => `- ${msg}`)
            ].join('\n');
            core.setFailed(message);
            return;
        }
        core.info(`Commit message 패턴 검사 ✅`);
    });
}
//# sourceMappingURL=validatePullRequest.js.map