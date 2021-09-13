import {
  ComponentContext,
  MoveComponentElementForm,
  UpdateComponentElementForm,
} from '@codelab/frontend/modules/component'
import { DeleteElementButton } from '@codelab/frontend/modules/element'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import { LoadingIndicator } from '@codelab/frontend/view/components'
import React, { useContext } from 'react'
import tw from 'twin.macro'
import { usePropCompletion } from '../containers/usePropCompletion'
import { MetaPaneBuilder } from './MetaPaneBuilder'

const loadingKey = 'metaPaneUpdateComponentElement'

export const MetaPaneBuilderComponent = () => {
  const { tree } = useContext(ComponentContext)
  const { providePropCompletion } = usePropCompletion()

  return (
    <SelectElementProvider tree={tree}>
      <MetaPaneBuilder
        tree={tree}
        renderUpdateElementContent={(element) => (
          <>
            <UpdateComponentElementForm
              key={element.id + '_update_form'}
              elementId={element.id}
              tree={tree}
              loadingStateKey={loadingKey}
              providePropCompletion={(value) =>
                providePropCompletion(value, element.id)
              }
            />

            <MoveComponentElementForm
              key={element.id + '_move_form'}
              elementId={element.id}
              loadingStateKey={loadingKey}
            />

            <div css={tw`absolute bottom-0 right-0 m-8`}>
              <LoadingIndicator recoilKey={loadingKey} />
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
