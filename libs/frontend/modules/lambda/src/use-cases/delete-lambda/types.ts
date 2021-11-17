import { FormUniformsProps } from '@codelab/frontend/view/components'
import { DeleteLambdaMutationVariables } from '../../graphql/Lambda.endpoints.graphql.gen'

export type DeleteLambdaMutationInput = DeleteLambdaMutationVariables['input']

export type DeleteLambdaFormProps = Omit<
  FormUniformsProps<DeleteLambdaMutationInput>,
  'schema'
> & {
  name?: string
}
