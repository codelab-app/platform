import { DeleteElementButton } from '@codelab/frontend/modules/element'
import {
  MovePageElementForm,
  PageContext,
  UpdatePageElementForm,
} from '@codelab/frontend/modules/page'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import React, { useContext } from 'react'
import { MetaPaneBuilder } from './MetaPaneBuilder'

export const MetaPaneBuilderPage = () => {
  const { tree } = useContext(PageContext)

  return (
    <SelectElementProvider tree={tree}>
      <MetaPaneBuilder
        renderUpdateElementContent={(element) => (
          <>
            <UpdatePageElementForm
              key={element.id + '_update_form'}
              elementId={element.id}
              tree={tree}
            />

            <MovePageElementForm
              key={element.id + '_move_form'}
              elementId={element.id}
            />

            <DeleteElementButton
              danger={true}
              elementId={element.id}
              metadata={element}
            />
          </>
        )}
      />
    </SelectElementProvider>
  )
}
