import { IPreRenderService } from '@codelab/frontend/abstract/core'
import { EditorPaneHeader } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreatePreRenderButton, GetPreRendersTable } from '../use-cases'

export interface PreRenderEditorPaneProps {
  preRenderService: IPreRenderService
  pageId: string
}

export const PreRenderEditorPane = observer<PreRenderEditorPaneProps>(
  ({ preRenderService, pageId }) => (
    <>
      <EditorPaneHeader
        extra={[<CreatePreRenderButton preRenderService={preRenderService} />]}
      >
        Pre Render
      </EditorPaneHeader>
      <GetPreRendersTable
        preRenderService={preRenderService}
        preRenders={[...preRenderService.preRenders.values()].filter(
          (x) => x.page.id === pageId,
        )}
      />
    </>
  ),
)
