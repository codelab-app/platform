import { IPreRender, IPreRenderService } from '@codelab/frontend/abstract/core'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { preRenderRef } from '../../../store'

export const ActionColumn = observer<{
  preRenderService: IPreRenderService
  preRender: Omit<IPreRender, 'writeCache'>
}>(({ preRender, preRenderService }) => (
  <Space size="middle">
    <ListItemEditButton
      onClick={() =>
        preRenderService.updateModal.open(preRenderRef(preRender.id))
      }
    />
    <ListItemDeleteButton
      onClick={() =>
        preRenderService.deleteModal.open(preRenderRef(preRender.id))
      }
    />
  </Space>
))
