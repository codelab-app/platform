import { DisplayIfField } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'
import { CreateStoreInput } from './createStoreSchema'

export const DisplayIfParent = observer(
  ({ children }: PropsWithChildren<any>) => (
    <DisplayIfField<CreateStoreInput>
      condition={(c) => Boolean(c.model.parentStore?.id)}
    >
      {children}
    </DisplayIfField>
  ),
)
