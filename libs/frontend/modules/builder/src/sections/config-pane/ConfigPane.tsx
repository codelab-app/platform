import {
  ACTION_SERVICE,
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
  IElement,
  IElementTree,
  IRenderer,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { usePropCompletion } from '../../hooks'
import { ConfigPaneTabContainer } from './ConfigPane-TabContainer'

type MetaPaneProps = {
  elementTree: IElementTree
  renderService: IRenderer
} & WithServices<
  | ATOM_SERVICE
  | TYPE_SERVICE
  | BUILDER_SERVICE
  | ELEMENT_SERVICE
  | COMPONENT_SERVICE
  | ACTION_SERVICE
>

export const ConfigPane = observer<MetaPaneProps>(
  ({
    typeService,
    atomService,
    builderService,
    elementService,
    componentService,
    renderService,
    elementTree,
    actionService,
  }) => {
    const { providePropCompletion } = usePropCompletion(renderService)
    const isRootElement = (element: IElement) => !element.parentElement

    return (
      <ConfigPaneTabContainer
        UpdateElementContent={observer(({ node, trackPromises }) => {
          /**
           * The builder tree nodes could be a component as well, in which case we would show the form for components
           */
          return (
            <>
              {node.__nodeType === ELEMENT_NODE_TYPE ? (
                <>
                  <UpdateElementForm
                    builderService={builderService}
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
                    disabled={isRootElement(node)}
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
        })}
        actionService={actionService}
        atomService={atomService}
        builderService={builderService}
        elementService={elementService}
        elementTree={elementTree}
        renderService={renderService}
        typeService={typeService}
      />
    )
  },
)

ConfigPane.displayName = 'MetaPane'
