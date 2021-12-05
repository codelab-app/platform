import { FormUniformsProps } from '@codelab/frontend/view/components'
import { UpdateTagMutationVariables } from '../../graphql/tag.endpoints.graphql.gen'

export type UpdateTagMutationInput = UpdateTagMutationVariables['input']['data']

export type UpdateTagFormProps = Omit<
  FormUniformsProps<UpdateTagMutationInput>,
  'schema'
>
