import { EditorPaneHeader } from '@codelab/frontend/view/components'
import { IPreRenderService } from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreatePreRenderButton } from '../use-cases'

export interface PreRenderEditorPaneProps {
  preRenderService: IPreRenderService
}

export const PreRenderEditorPane = observer<PreRenderEditorPaneProps>(
  ({ preRenderService }) => (
    <>
      <EditorPaneHeader
        extra={[<CreatePreRenderButton preRenderService={preRenderService} />]}
      />
      <div>List</div>
    </>
  ),
)
