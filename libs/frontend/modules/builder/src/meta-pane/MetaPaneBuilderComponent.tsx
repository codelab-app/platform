import {
  DeleteElementButton,
  MoveElementForm,
  UpdateElementForm,
  useElementGraphContext,
} from '@codelab/frontend/modules/element'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import { LoadingIndicator } from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { usePropCompletion } from '../store/usePropCompletion'
import { MetaPaneBuilder } from './MetaPaneBuilder'

export const MetaPaneBuilderComponent = () => {
  const { elementTree } = useElementGraphContext()
  const { providePropCompletion } = usePropCompletion()

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
              key={element.id + '_move_form'}
              elementId={element.id}
              trackPromises={trackPromises}
            />

            <div css={tw`absolute bottom-0 right-0 m-8`}>
              <LoadingIndicator {...trackPromises} />
            </div>

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
