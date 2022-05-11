import {
  ATOM_SERVICE,
  BUILDER_SERVICE,
  ELEMENT_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import {
  DeleteElementButton,
  MoveElementForm,
  UpdateElementForm,
} from '@codelab/frontend/modules/element'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { usePropCompletion } from '../../hooks'
import { MetaPaneBuilder } from './MetaPaneBuilder'

export const MetaPaneBuilderPage = observer<
  WithServices<ATOM_SERVICE | TYPE_SERVICE | BUILDER_SERVICE | ELEMENT_SERVICE>
>(({ typeService, atomService, builderService, elementService }) => {
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

          <DeleteElementButton
            element={element}
            elementService={elementService}
          />
        </>
      )}
      typeService={typeService}
    />
  )
})
