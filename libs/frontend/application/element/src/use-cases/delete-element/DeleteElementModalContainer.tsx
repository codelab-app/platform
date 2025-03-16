'use client'

import type { IElementModel } from '@codelab/frontend/abstract/domain'

import { observer } from 'mobx-react-lite'

import { ElementConnector } from '../../views/Element.connector'
import { DeleteElementModal } from './DeleteElementModal'

export const DeleteElementModalContainer = observer(
  ({ id }: { id: string }) => {
    return (
      <ElementConnector id={id}>
        {(element: IElementModel) => <DeleteElementModal element={element} />}
      </ElementConnector>
    )
  },
)

DeleteElementModalContainer.displayName = 'DeleteElementModalContainer'
