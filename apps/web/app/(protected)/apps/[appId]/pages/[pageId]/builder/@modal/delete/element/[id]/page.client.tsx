'use client'

import type { IElementModel } from '@codelab/frontend/abstract/domain'

import { DeleteElementModal } from '@codelab/frontend-application-element/use-cases/delete-element'
import { ElementConnector } from '@codelab/frontend-application-element/views'
import { observer } from 'mobx-react-lite'

export const DeleteElementModalContainer = observer(
  ({ id }: { id: string }) => {
    return (
      <ElementConnector id={id}>
        {(element: IElementModel) => <DeleteElementModal element={element} />}
      </ElementConnector>
    )
  },
)
