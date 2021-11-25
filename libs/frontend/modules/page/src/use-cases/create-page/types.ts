import { FormUniformsProps } from '@codelab/frontend/view/components'
import { CreatePageMutationVariables } from '../../graphql/Page.endpoints.graphql.gen'

export type CreatePageMutationInput = Omit<
  CreatePageMutationVariables['input'],
  'rootElement'
>

export type CreatePageFormProps = Omit<
  FormUniformsProps<CreatePageMutationInput>,
  'schema'
>
