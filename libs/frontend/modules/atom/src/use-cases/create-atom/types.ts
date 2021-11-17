import { FormUniformsProps } from '@codelab/frontend/view/components'
import { CreateAtomMutationVariables } from '../../graphql/Atom.endpoints.graphql.gen'

export type CreateAtomButtonProps = {
  centerIcon?: boolean
}

export type CreateAtomMutationInput = CreateAtomMutationVariables['input']

export type CreateAtomFormProps = Omit<
  FormUniformsProps<CreateAtomMutationInput>,
  'schema'
>
