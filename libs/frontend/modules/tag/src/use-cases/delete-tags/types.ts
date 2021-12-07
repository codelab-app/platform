import { FormUniformsProps } from '@codelab/frontend/view/components'
import { DeleteTagsMutationVariables } from '../../graphql/tag.endpoints.graphql.gen'

export type DeleteTagsMutationInput = DeleteTagsMutationVariables['input']

export type DeleteFromProps = Omit<
  FormUniformsProps<DeleteTagsMutationInput>,
  'schema'
>
