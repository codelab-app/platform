import { FormUniformsProps } from '@codelab/frontend/view/components'
import { UpdateAtomMutationVariables } from '../../graphql/Atom.endpoints.graphql.gen'

export type UpdateAtomMutationInput =
  UpdateAtomMutationVariables['input']['data']

export type UpdateAtomFormProps = Omit<
  FormUniformsProps<UpdateAtomMutationInput>,
  'schema'
>
