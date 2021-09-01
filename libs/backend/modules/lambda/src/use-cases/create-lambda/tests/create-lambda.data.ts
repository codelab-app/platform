import { CreateLambdaInput } from '../create-lambda.input'

export const createLambdaInput: CreateLambdaInput = {
  name: 'HelloWorld',
  body: 'exports.handler = async(event, context) => "Hello, World!"',
}
