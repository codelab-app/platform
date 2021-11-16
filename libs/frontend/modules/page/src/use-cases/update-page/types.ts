import { FormUniformsProps } from '@codelab/frontend/view/components'
import { UpdatePageMutationVariables } from '../../graphql/Page.endpoints.graphql.gen'

export type UpdatePageMutationInput =
  UpdatePageMutationVariables['input']['updateData']

export type UpdatePageFormProps = Omit<
  FormUniformsProps<UpdatePageMutationInput>,
  'schema'
>
