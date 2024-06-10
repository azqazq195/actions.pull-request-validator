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
exports.addAssigneesPullRequestCreator = void 0;
const github = __importStar(require("@actions/github"));
function addAssigneesPullRequestCreator(inputs) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const octokit = github.getOctokit(inputs.token);
        const pr = github.context.payload.pull_request;
        if (!pr) {
            console.log("Pull Request 정보를 찾을 수 없습니다.");
            return;
        }
        // @ts-ignore
        const prCreator = (_a = pr.user) === null || _a === void 0 ? void 0 : _a.login;
        try {
            yield octokit.rest.issues.addAssignees({
                owner: inputs.owner,
                repo: inputs.repo,
                issue_number: inputs.prNumber,
                assignees: [prCreator]
            });
        }
        catch (error) {
            console.log(error.message);
            console.log("Pull Request 담당자 등록 실패");
            return;
        }
        console.log(`PR 생성자 @${prCreator}를 이슈 #${inputs.prNumber}의 담당자로 지정하였습니다.`);
    });
}
exports.addAssigneesPullRequestCreator = addAssigneesPullRequestCreator;
//# sourceMappingURL=addAssigneesPullRequestCreator.js.map