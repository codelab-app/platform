import { FormUniformsProps } from '@codelab/frontend/view/components'
import { UpdateLambdaMutationVariables } from '../../graphql/Lambda.endpoints.graphql.gen'

export type UpdateLambdaMutationInput = UpdateLambdaMutationVariables['input']

export type UpdateLambdaFormProps = Omit<
  FormUniformsProps<UpdateLambdaMutationInput>,
  'schema'
>
