import { DisplayIfField } from '@codelab/frontend/view/components'
import { ICreateTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'

export const DisplayIfKind = observer(
  ({ kind, children }: PropsWithChildren<{ kind: ITypeKind }>) => (
    <DisplayIfField<ICreateTypeDTO> condition={(c) => c.model.kind === kind}>
      {children}
    </DisplayIfField>
  ),
)
