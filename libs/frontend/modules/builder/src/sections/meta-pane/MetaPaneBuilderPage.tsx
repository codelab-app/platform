import { AtomStore } from '@codelab/frontend/modules/atom'
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
import { observer } from 'mobx-react-lite'
import React from 'react'
import { usePropCompletion } from '../../hooks'
import { MetaPaneBuilder } from './MetaPaneBuilder'

export interface MetaPaneBuilderPageProps {
  typeStore: TypeStore
  atomStore: AtomStore
}

export const MetaPaneBuilderPage = observer<MetaPaneBuilderPageProps>(
  ({ typeStore, atomStore }) => {
    const { providePropCompletion } = usePropCompletion()
    const { elementTree } = useElementGraphContext()

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
