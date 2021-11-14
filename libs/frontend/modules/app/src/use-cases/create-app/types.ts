import { FormUniformsProps } from '@codelab/frontend/view/components'
import { CreateAppMutationVariables } from '../../graphql/App.endpoints.graphql.gen'

export type CreateAppMutationInput = CreateAppMutationVariables['input']

export type CreateAppButtonProps = { createNow?: boolean }

export type CreateAppFormProps = Omit<
  FormUniformsProps<CreateAppMutationInput>,
  'schema'
>
