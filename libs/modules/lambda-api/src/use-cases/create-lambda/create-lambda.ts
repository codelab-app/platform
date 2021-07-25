import { ApiResponse, graphqlRequest } from '@codelab/backend'
import {
  CreateLambdaGql,
  CreateLambdaInput,
  CreateLambdaMutationResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'

export const createLambda = async (
  app: INestApplication,
  input: CreateLambdaInput,
) => {
  const lambda = await graphqlRequest(app, CreateLambdaGql, {
    input,
  }).then((res: ApiResponse<CreateLambdaMutationResult>) => {
    return res.body.data?.createLambda
  })

  // if (!lambda) {
  //   throw new Error('Lambda not created')
  // }

  return lambda
}
