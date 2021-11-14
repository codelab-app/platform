import { FormUniformsProps } from '@codelab/frontend/view/components'

export type DeleteAppMutationInput = Record<string, unknown>

export type DeleteAppFormProps = Omit<
  FormUniformsProps<DeleteAppMutationInput>,
  'schema'
> & {
  name?: string
}
