import { ComponentContext } from '@codelab/frontend/shared'
import {
  MoveComponentElementForm,
  UpdateComponentElementForm,
} from '@codelab/modules/component'
import {
  DeleteElementButton,
  ElementCssEditor,
  UpdateElementPropsForm,
} from '@codelab/modules/element'
import React, { useContext } from 'react'
import { MetaPaneBuilderTemplate } from '../../paneTemplates'

export const MetaPaneComponentDetail = () => {
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

          <div>
            <DeleteElementButton
              danger={true}
              elementId={element.id}
              metadata={element}
            />
          </div>
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
