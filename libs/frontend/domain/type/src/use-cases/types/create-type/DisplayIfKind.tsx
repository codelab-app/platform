import { ICreateTypeDTO } from '@codelab/frontend/abstract/core'
import { DisplayIfField } from '@codelab/frontend/view/components'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'

export const DisplayIfKind = observer(
  ({ kind, children }: PropsWithChildren<{ kind: ITypeKind }>) => (
    <DisplayIfField<ICreateTypeDTO>
      condition={(context) => context.model.kind === kind}
    >
      {children}
    </DisplayIfField>
  ),
)
