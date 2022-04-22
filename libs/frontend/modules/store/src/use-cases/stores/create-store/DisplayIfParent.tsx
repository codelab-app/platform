import { DisplayIfField } from '@codelab/frontend/view/components'
import { ICreateStoreDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'

export const DisplayIfParent = observer(
  ({ children }: PropsWithChildren<any>) => (
    <DisplayIfField<ICreateStoreDTO>
      condition={(c) => Boolean(c.model.parentStore?.id)}
    >
      {children}
    </DisplayIfField>
  ),
)
