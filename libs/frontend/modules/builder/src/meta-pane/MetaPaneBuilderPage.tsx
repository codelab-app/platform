import {
  DeleteElementButton,
  MoveElementForm,
  UpdateElementForm,
  useElementGraphContext,
} from '@codelab/frontend/modules/element'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import React from 'react'
import { usePropCompletion } from '../store/usePropCompletion'
import { MetaPaneBuilder } from './MetaPaneBuilder'

export const MetaPaneBuilderPage = () => {
  const { providePropCompletion } = usePropCompletion()
  const { elementTree } = useElementGraphContext()

  if (!elementTree) {
    return null
  }

  return (
    <SelectElementProvider tree={elementTree}>
      <MetaPaneBuilder
        tree={elementTree}
        renderUpdateElementContent={(element, trackPromises) => (
          <>
            <UpdateElementForm
              key={element.id + '_update_form'}
              elementId={element.id}
              tree={elementTree}
              trackPromises={trackPromises}
              providePropCompletion={(value) =>
                providePropCompletion(value, element.id)
              }
            />

            <MoveElementForm
              tree={elementTree}
              trackPromises={trackPromises}
              key={element.id + '_move_form'}
              elementId={element.id}
            />

            <DeleteElementButton
              danger={true}
              elementId={element.id}
              entity={element}
            />
          </>
        )}
      />
    </SelectElementProvider>
  )
}
