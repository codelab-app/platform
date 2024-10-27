import type { ITypeCreateFormData } from '@codelab/frontend/abstract/domain'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { PropsWithChildren } from 'react'

import { DisplayIfField } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'

export const DisplayIfKind = observer(
  ({ children, kind }: PropsWithChildren<{ kind: ITypeKind }>) => (
    <DisplayIfField<ITypeCreateFormData>
      condition={(context) => context.model.kind === kind}
    >
      {children}
    </DisplayIfField>
  ),
)
