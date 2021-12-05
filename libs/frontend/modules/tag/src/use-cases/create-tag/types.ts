import { CreateTagInput } from '@codelab/frontend/abstract/codegen'
import { FormUniformsProps } from '@codelab/frontend/view/components'

export type CreateTagFormProps = Omit<
  FormUniformsProps<CreateTagInput>,
  'schema'
>
