import { DisplayIfField } from '@codelab/frontend-presentation-view/components/form'
import type { ICreateTypeDto, ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React from 'react'

export const DisplayIfKind = observer(
  ({ children, kind }: PropsWithChildren<{ kind: ITypeKind }>) => (
    <DisplayIfField<ICreateTypeDto>
      condition={(context) => context.model.kind === kind}
    >
      {children}
    </DisplayIfField>
  ),
)
