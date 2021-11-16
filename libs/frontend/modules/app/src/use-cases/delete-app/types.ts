import { FormUniformsProps } from '@codelab/frontend/view/components'
import { DeleteAppMutationVariables } from '../../graphql/App.endpoints.graphql.gen'

export type DeleteAppMutationInput = DeleteAppMutationVariables['input']

export type DeleteAppFormProps = Omit<
  FormUniformsProps<DeleteAppMutationInput>,
  'schema'
> & {
  name?: string
}
