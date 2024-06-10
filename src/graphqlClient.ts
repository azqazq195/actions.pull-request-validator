import * as context from './context';
import {graphql} from '@octokit/graphql'

export async function getGraphqlClient() {
    const inputs = await context.getInputs();
    return graphql.defaults({
        headers: {
            Authorization: `bearer ${inputs.token}`
        }
    });
}
