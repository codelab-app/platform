import { CreateLambdaInput } from '@codelab/codegen/graphql'

export const createLambdaInput: CreateLambdaInput = {
  name: 'Hello World',
  body: 'function(){ console.log("Hello World")}',
}
