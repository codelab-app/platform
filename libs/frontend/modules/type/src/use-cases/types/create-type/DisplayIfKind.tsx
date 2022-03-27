import { DisplayIfField } from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'
import { CreateTypeSchema } from './create-type-input.factory'

export const DisplayIfKind = observer(
  ({ kind, children }: PropsWithChildren<{ kind: TypeKind }>) => (
    <DisplayIfField<CreateTypeSchema> condition={(c) => c.model.kind === kind}>
      {children}
    </DisplayIfField>
  ),
)
