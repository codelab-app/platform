import { FormUniformsProps } from '@codelab/frontend/view/components'
import { CreateLambdaMutationVariables } from '../../graphql/Lambda.endpoints.graphql.gen'

export type CreateLambdaMutationInput = CreateLambdaMutationVariables['input']

export type CreateLambdaFormProps = Omit<
  FormUniformsProps<CreateLambdaMutationInput>,
  'schema'
>
