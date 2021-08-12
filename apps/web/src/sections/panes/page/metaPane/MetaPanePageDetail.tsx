import {
  DeleteElementButton,
  ElementCssEditor,
  UpdateElementPropsForm,
} from '@codelab/frontend/modules/element'
import {
  MovePageElementForm,
  UpdatePageElementForm,
} from '@codelab/frontend/modules/page'
import { PageContext } from '@codelab/frontend/presenter/container'
import React, { useContext } from 'react'
import { MetaPaneBuilderTemplate } from '../../paneTemplates'

export const MetaPanePageDetail = () => {
  const { tree } = useContext(PageContext)

  return (
    <MetaPaneBuilderTemplate
      renderUpdateElementContent={(element) => (
        <>
          <UpdatePageElementForm
            key={element.id + '_update_form'}
            element={element}
            tree={tree}
          />

          <MovePageElementForm
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
