import { WithAtomService } from '@codelab/frontend/modules/atom'
import {
  DeleteElementButton,
  MoveElementForm,
  UpdateElementForm,
  WithElementService,
} from '@codelab/frontend/modules/element'
import { WithTypeService } from '@codelab/frontend/modules/type'
import { LoadingIndicator } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { usePropCompletion } from '../../hooks'
import { WithBuilderService } from '../../store/BuilderService'
import { MetaPaneBuilder } from './MetaPaneBuilder'

export type MetaPaneBuilderComponentProps = WithTypeService &
  WithAtomService &
  WithBuilderService &
  WithElementService

export const MetaPaneBuilderComponent = observer<MetaPaneBuilderComponentProps>(
  ({ typeService, atomService, builderService, elementService }) => {
    const { providePropCompletion } = usePropCompletion(builderService)

    return (
      <MetaPaneBuilder
        atomService={atomService}
        builderService={builderService}
        elementService={elementService}
        renderUpdateElementContent={(element, trackPromises) => (
          <>
            <UpdateElementForm
              element={element}
              elementService={elementService}
              key={element.id + '_update_form'}
              providePropCompletion={(value) =>
                providePropCompletion(value, element.id)
              }
              trackPromises={trackPromises}
            />

            <MoveElementForm
              element={element}
              elementService={elementService}
              key={element.id + '_move_form'}
              trackPromises={trackPromises}
            />

            <div css={tw`absolute bottom-0 right-0 m-8`}>
              <LoadingIndicator
                error={trackPromises.error}
                isLoading={trackPromises.isLoading}
              />
            </div>

            <DeleteElementButton
              element={element}
              elementService={elementService}
            />
          </>
        )}
        typeService={typeService}
      />
    )
  },
)
