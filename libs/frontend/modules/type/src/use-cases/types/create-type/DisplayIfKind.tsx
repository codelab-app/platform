import { DisplayIfField } from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import { CreateTypeSchema } from './createTypeSchema'

export const DisplayIfKind = ({
  kind,
  children,
}: React.PropsWithChildren<{ kind: TypeKind }>) => (
  <DisplayIfField<CreateTypeSchema> condition={(c) => c.model.kind === kind}>
    {children}
  </DisplayIfField>
)
