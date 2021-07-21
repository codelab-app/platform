import { ApiResponse, request } from '@codelab/backend'
import {
  __LambdaFragment,
  CreateLambdaGql,
  CreateLambdaMutation,
  CreateLambdaMutationResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ASTNode, print } from 'graphql'

export type GraphqlRequest<TOperationVariables, TResponse> = (
  app: INestApplication,
  variables: TOperationVariables,
  gql: ASTNode,
) => Promise<TResponse>

export const createLambda: GraphqlRequest<
  CreateLambdaMutation,
  __LambdaFragment
> = async (app: INestApplication, variables) => {
  const lambda = await request(app.getHttpServer())
    .send({
      query: print(CreateLambdaGql),
      variables,
    })
    .expect(200)
    .then(
      (res: ApiResponse<CreateLambdaMutationResult>) =>
        res.body.data?.createLambda,
    )

  if (!lambda) {
    throw new Error('Lambda not created')
  }

  return lambda
}
