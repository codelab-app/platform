import { FormUniformsProps } from '@codelab/frontend/view/components'
import { DeleteAtomMutationVariables } from '../../graphql/Atom.endpoints.graphql.gen'

export type DeleteAtomMutationInput = DeleteAtomMutationVariables['input']

export type DeleteAtomsFormProps = Omit<
  FormUniformsProps<DeleteAtomMutationInput>,
  'schema'
> & {
  name?: string
}
