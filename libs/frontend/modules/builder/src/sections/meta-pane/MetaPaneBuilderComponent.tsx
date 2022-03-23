import { AtomService } from '@codelab/frontend/modules/atom'
import {
  DeleteElementButton,
  MoveElementForm,
  UpdateElementForm,
  useElementGraphContext,
} from '@codelab/frontend/modules/element'
import {
  SelectElementProvider,
  TypeStore,
} from '@codelab/frontend/modules/type'
import { LoadingIndicator } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { usePropCompletion } from '../../hooks'
import { MetaPaneBuilder } from './MetaPaneBuilder'

export interface MetaPaneBuilderComponentProps {
  typeStore: TypeStore
  atomStore: AtomService
}

export const MetaPaneBuilderComponent = observer<MetaPaneBuilderComponentProps>(
  ({ typeStore, atomStore }) => {
    const { elementTree } = useElementGraphContext()
    const { providePropCompletion } = usePropCompletion()

    if (!elementTree) {
      return null
    }

    return (
      <SelectElementProvider tree={elementTree}>
        <MetaPaneBuilder
          atomStore={atomStore}
          renderUpdateElementContent={(element, trackPromises) => (
            <>
              <UpdateElementForm
                elementId={element.id}
                key={element.id + '_update_form'}
                model={{}}
                providePropCompletion={(value) =>
                  providePropCompletion(value, element.id)
                }
                submitRef={undefined}
                trackPromises={trackPromises}
                tree={elementTree}
              />

              <MoveElementForm
                elementId={element.id}
                key={element.id + '_move_form'}
                model={{}}
                submitRef={undefined}
                trackPromises={trackPromises}
                tree={elementTree}
              />

              <div css={tw`absolute bottom-0 right-0 m-8`}>
                <LoadingIndicator
                  error={trackPromises.error}
                  isLoading={trackPromises.isLoading}
                />
              </div>

              <DeleteElementButton elementId={element.id} entity={element} />
            </>
          )}
          tree={elementTree}
          typeStore={typeStore}
        />
      </SelectElementProvider>
    )
  },
)
