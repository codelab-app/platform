import { FormUniformsProps } from '@codelab/frontend/view/components'
import { UpdateAppMutationVariables } from '../../graphql/App.endpoints.graphql.gen'

export type UpdateAppMutationInput = UpdateAppMutationVariables['input']['data']

export type UpdateAppFormProps = Omit<
  FormUniformsProps<UpdateAppMutationInput>,
  'schema'
>
