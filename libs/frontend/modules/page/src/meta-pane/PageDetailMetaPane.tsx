import { MetaPaneBuilderTemplate } from '@codelab/frontend/modules/builder'
import {
  DeleteElementButton,
  ElementCssEditor,
  UpdateElementPropsForm,
} from '@codelab/frontend/modules/element'
import { PageContext } from '@codelab/frontend/presenter/container'
import React, { useContext } from 'react'
import { MovePageElementForm } from '../use-cases/page-element/move-page-element'
import { UpdatePageElementForm } from '../use-cases/page-element/update-page-element'

export const PageDetailMetaPane = () => {
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
