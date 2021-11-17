import { FormUniformsProps } from '@codelab/frontend/view/components'
import { DeletePageMutationVariables } from '../../graphql/Page.endpoints.graphql.gen'

export type DeletePageMutationInput = DeletePageMutationVariables['input']

export type DeletePageFormProps = Omit<
  FormUniformsProps<DeletePageMutationInput>,
  'schema'
> & {
  name?: string
}
