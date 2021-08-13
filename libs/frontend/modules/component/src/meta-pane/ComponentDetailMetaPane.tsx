import { MetaPaneBuilderTemplate } from '@codelab/frontend/modules/builder'
import {
  DeleteElementButton,
  ElementCssEditor,
  UpdateElementPropsForm,
} from '@codelab/frontend/modules/element'
import { ComponentContext } from '@codelab/frontend/presenter/container'
import React, { useContext } from 'react'
import {
  MoveComponentElementForm,
  UpdateComponentElementForm,
} from '../use-cases/component-element'

export const ComponentDetailMetaPane = () => {
  const { tree } = useContext(ComponentContext)

  return (
    <MetaPaneBuilderTemplate
      renderUpdateElementContent={(element) => (
        <>
          <UpdateComponentElementForm
            key={element.id + '_update_form'}
            element={element}
            tree={tree}
          />

          <MoveComponentElementForm
            key={element.id + '_move_form'}
            elementId={element.id}
          />

          <DeleteElementButton
            danger={true}
            elementId={element.id}
            metadata={element}
          />
        </>
      )}
      renderUpdatePropsContent={(element) => (
        <UpdateElementPropsForm element={element} key={element.id} />
      )}
      renderUpdateCssContent={(element) => (
        <ElementCssEditor key={element.id} element={element} />
      )}
    />
  )
}
