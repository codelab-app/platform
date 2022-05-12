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
import {
  COMPONENT_NODE_TYPE,
  ELEMENT_NODE_TYPE,
  IElementTree,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { usePropCompletion } from '../../hooks'
import { MetaPaneTabContainer } from './MetaPane-TabContainer'

type MetaPaneProps = {
  elementTree: IElementTree
} & WithServices<
  ATOM_SERVICE | TYPE_SERVICE | BUILDER_SERVICE | ELEMENT_SERVICE
>

export const MetaPane = observer<MetaPaneProps>(
  ({
    typeService,
    atomService,
    builderService,
    elementService,
    elementTree,
  }) => {
    const { providePropCompletion } = usePropCompletion(builderService)

    return (
      <MetaPaneTabContainer
        atomService={atomService}
        builderService={builderService}
        elementService={elementService}
        elementTree={elementTree}
        renderUpdateElementContent={(element, trackPromises) => {
          /**
           * The builder tree nodes could be a component as well, in which case we would show the form for components
           */
          return (
            <>
              {element.__nodeType === ELEMENT_NODE_TYPE ? (
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
                    elementTree={elementTree}
                    key={element.id + '_move_form'}
                    trackPromises={trackPromises}
                  />
                  <DeleteElementButton
                    element={element}
                    elementService={elementService}
                  />
                </>
              ) : null}

              {element.__nodeType === COMPONENT_NODE_TYPE ? <></> : null}
            </>
          )
        }}
        typeService={typeService}
      />
    )
  },
)
