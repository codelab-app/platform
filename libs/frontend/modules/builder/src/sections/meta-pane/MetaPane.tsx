import {
  ATOM_SERVICE,
  BUILDER_SERVICE,
  COMPONENT_SERVICE,
  ELEMENT_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { UpdateComponentForm } from '@codelab/frontend/modules/component'
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
  | ATOM_SERVICE
  | TYPE_SERVICE
  | BUILDER_SERVICE
  | ELEMENT_SERVICE
  | COMPONENT_SERVICE
>

export const MetaPane = observer<MetaPaneProps>(
  ({
    typeService,
    atomService,
    builderService,
    elementService,
    componentService,
    elementTree,
  }) => {
    const { providePropCompletion } = usePropCompletion(builderService)

    return (
      <MetaPaneTabContainer
        UpdateElementContent={({ node, trackPromises }) => {
          /**
           * The builder tree nodes could be a component as well, in which case we would show the form for components
           */
          return (
            <>
              {node.__nodeType === ELEMENT_NODE_TYPE ? (
                <>
                  <UpdateElementForm
                    element={node}
                    elementService={elementService}
                    key={node.id + '_update_form'}
                    providePropCompletion={(value) =>
                      providePropCompletion(value, node.id)
                    }
                    trackPromises={trackPromises}
                  />
                  <MoveElementForm
                    element={node}
                    elementService={elementService}
                    elementTree={elementTree}
                    key={node.id + '_move_form'}
                    trackPromises={trackPromises}
                  />
                  <DeleteElementButton
                    element={node}
                    elementService={elementService}
                  />
                </>
              ) : null}

              {node.__nodeType === COMPONENT_NODE_TYPE ? (
                <UpdateComponentForm
                  component={node}
                  componentService={componentService}
                />
              ) : null}
            </>
          )
        }}
        atomService={atomService}
        builderService={builderService}
        elementService={elementService}
        elementTree={elementTree}
        typeService={typeService}
      />
    )
  },
)

MetaPane.displayName = 'MetaPane'
