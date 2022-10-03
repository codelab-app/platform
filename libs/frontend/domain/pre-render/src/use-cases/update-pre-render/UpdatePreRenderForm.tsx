import {
  IPreRender,
  IPreRenderService,
  IUpdatePreRenderDTO,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { Form } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updatePreRenderSchema } from './updatePreRenderSchema'

interface UpdatePreRenderFormProps {
  preRender: IPreRender
  preRenderService: IPreRenderService
}
/**
 * Used for meta pane
 */
export const UpdatePreRenderForm = observer<UpdatePreRenderFormProps>(
  ({ preRenderService, preRender }) => {
    const onSubmit = (input: IUpdatePreRenderDTO) => {
      return preRenderService.update(preRender, input)
    }

    const model = {
      code: preRender.code,
      type: preRender.type,
      pageId: preRender.page.id,
      id: preRender.id,
    }

    return (
      <Form<IUpdatePreRenderDTO>
        autosave
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating PreRender',
          type: 'error',
        })}
        schema={updatePreRenderSchema}
      >
        <AutoFields />
      </Form>
    )
  },
)
