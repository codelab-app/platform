import {
  ComponentContext,
  MoveComponentElementForm,
  UpdateComponentElementForm,
} from '@codelab/frontend/modules/component'
import { DeleteElementButton } from '@codelab/frontend/modules/element'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import React, { useContext } from 'react'
import { MetaPaneBuilder } from './MetaPaneBuilder'

export const MetaPaneBuilderComponent = () => {
  const { tree } = useContext(ComponentContext)

  return (
    <SelectElementProvider tree={tree}>
      <MetaPaneBuilder
        renderUpdateElementContent={(element) => (
          <>
            <UpdateComponentElementForm
              key={element.id + '_update_form'}
              elementId={element.id}
              tree={tree}
            />

            <MoveComponentElementForm
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
