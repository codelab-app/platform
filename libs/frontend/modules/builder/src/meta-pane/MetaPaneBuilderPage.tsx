import {
  DeleteElementButton,
  UpdateElementForm,
} from '@codelab/frontend/modules/element'
import {
  MovePageElementForm,
  PageContext,
} from '@codelab/frontend/modules/page'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import React, { useContext } from 'react'
import { usePropCompletion } from '../containers/usePropCompletion'
import { MetaPaneBuilder } from './MetaPaneBuilder'

export const MetaPaneBuilderPage = () => {
  const { tree } = useContext(PageContext)
  const { providePropCompletion } = usePropCompletion()

  return (
    <SelectElementProvider tree={tree}>
      <MetaPaneBuilder
        tree={tree}
        renderUpdateElementContent={(element, loadingKey) => (
          <>
            <UpdateElementForm
              key={element.id + '_update_form'}
              elementId={element.id}
              tree={tree}
              loadingStateKey={loadingKey}
              providePropCompletion={(value) =>
                providePropCompletion(value, element.id)
              }
            />

            <MovePageElementForm
              loadingStateKey={loadingKey}
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
