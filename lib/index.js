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
const context = __importStar(require("./context"));
const core = __importStar(require("@actions/core"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputs = yield context.getInputs();
        // 3/4 bit
        core.info('\u001b[35mThis foreground will be magenta');
        // 8 bit
        core.info('\u001b[38;5;6mThis foreground will be cyan');
        // 24 bit
        core.info('\u001b[38;2;255;0;0mThis foreground will be bright red');
        core.error('This is a bad error, action may still succeed though.');
        core.warning('Something went wrong, but it\'s not bad enough to fail the build.');
        core.notice('Something happened that you might want to know about.');
        // PR에 연결된 Issue 확인
        // await checkClosingIssuesReferences(inputs);
        // PRCreate 담당자 등록 -> issue 를 타고 확인 가능하기 때문에 필요한가?
        // await addAssigneesPullRequestCreator(inputs);
    });
}
run().then(r => r);
//# sourceMappingURL=index.js.map