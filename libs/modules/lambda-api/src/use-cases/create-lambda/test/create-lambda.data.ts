import { CreateLambdaInput } from '@codelab/codegen/graphql'

export const createLambdaInput: CreateLambdaInput = {
  name: 'HelloWorld',
  body: 'function(){ console.log("Hello World")}',
}
