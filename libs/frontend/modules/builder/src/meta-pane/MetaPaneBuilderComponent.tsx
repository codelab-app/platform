import {
  ComponentContext,
  MoveComponentElementForm,
  refetchGetComponentElementsQuery,
} from '@codelab/frontend/modules/component'
import {
  DeleteElementButton,
  UpdateElementForm,
} from '@codelab/frontend/modules/element'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import { LoadingIndicator } from '@codelab/frontend/view/components'
import React, { useContext } from 'react'
import tw from 'twin.macro'
import { usePropCompletion } from '../containers/usePropCompletion'
import { MetaPaneBuilder } from './MetaPaneBuilder'

export const MetaPaneBuilderComponent = () => {
  const { tree, component } = useContext(ComponentContext)
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
              refetchQueries={[
                refetchGetComponentElementsQuery({
                  input: { componentId: component.id },
                }),
              ]}
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
