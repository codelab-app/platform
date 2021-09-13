import { DeleteElementButton } from '@codelab/frontend/modules/element'
import {
  MovePageElementForm,
  PageContext,
  UpdatePageElementForm,
} from '@codelab/frontend/modules/page'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import { LoadingIndicator } from '@codelab/frontend/view/components'
import React, { useContext } from 'react'
import tw from 'twin.macro'
import { usePropCompletion } from '../containers/usePropCompletion'
import { MetaPaneBuilder } from './MetaPaneBuilder'

const loadingKey = 'metaPaneUpdatePageElement'

export const MetaPaneBuilderPage = () => {
  const { tree } = useContext(PageContext)
  const { providePropCompletion } = usePropCompletion()

  return (
    <SelectElementProvider tree={tree}>
      <MetaPaneBuilder
        tree={tree}
        renderUpdateElementContent={(element) => (
          <>
            <UpdatePageElementForm
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
