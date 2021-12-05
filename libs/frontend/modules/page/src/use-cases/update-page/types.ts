import { FormUniformsProps } from '@codelab/frontend/view/components'
import { UpdatePageMutationVariables } from '../../graphql/Page.endpoints.graphql.gen'

export type UpdatePageMutationInput = Omit<
  UpdatePageMutationVariables['input']['updateData'],
  'rootElement'
>

export type UpdatePageFormProps = Omit<
  FormUniformsProps<UpdatePageMutationInput>,
  'schema'
>
