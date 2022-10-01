import { ICreateTypeDTO, ITypeKind } from '@codelab/frontend/abstract/core'
import { DisplayIfField } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'

export const DisplayIfKind = observer(
  ({ kind, children }: PropsWithChildren<{ kind: ITypeKind }>) => (
    <DisplayIfField<ICreateTypeDTO> condition={(c) => c.model.kind === kind}>
      {children}
    </DisplayIfField>
  ),
)
