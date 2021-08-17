import { CreateLambdaInput } from '@codelab/shared/codegen/graphql'

export const createLambdaInput: CreateLambdaInput = {
  name: 'HelloWorld',
  body: 'exports.handler = async(event, context) => "Hello, World!"',
}
