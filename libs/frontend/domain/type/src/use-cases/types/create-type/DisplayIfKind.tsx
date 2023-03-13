import type { ICreateTypeData } from '@codelab/frontend/abstract/core'
import { DisplayIfField } from '@codelab/frontend/view/components'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React from 'react'

export const DisplayIfKind = observer(
  ({ children, kind }: PropsWithChildren<{ kind: ITypeKind }>) => (
    <DisplayIfField<ICreateTypeData>
      condition={(context) => context.model.kind === kind}
    >
      {children}
    </DisplayIfField>
  ),
)
