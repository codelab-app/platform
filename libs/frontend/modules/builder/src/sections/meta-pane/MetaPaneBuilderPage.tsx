import { WithAtomService } from '@codelab/frontend/modules/atom'
import {
  DeleteElementButton,
  MoveElementForm,
  UpdateElementForm,
  WithElementService,
} from '@codelab/frontend/modules/element'
import { WithTypeService } from '@codelab/frontend/modules/type'
import { observer } from 'mobx-react-lite'
import { usePropCompletion } from '../../hooks'
import { WithBuilderService } from '../../store/BuilderService'
import { MetaPaneBuilder } from './MetaPaneBuilder'

export type MetaPaneBuilderPageProps = WithAtomService &
  WithTypeService &
  WithBuilderService &
  WithElementService

export const MetaPaneBuilderPage = observer<MetaPaneBuilderPageProps>(
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
              model={{}}
              providePropCompletion={(value) =>
                providePropCompletion(value, element.id)
              }
              submitRef={undefined}
              trackPromises={trackPromises}
            />

            <MoveElementForm
              element={element}
              elementService={elementService}
              key={element.id + '_move_form'}
              model={{}}
              submitRef={undefined}
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
  },
)
