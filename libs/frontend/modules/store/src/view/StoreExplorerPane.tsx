import { PlusOutlined } from '@ant-design/icons'
import { typeRef } from '@codelab/frontend/modules/type'
import { ExplorerPaneTemplate } from '@codelab/frontend/view/templates'
import {
  IActionService,
  IInterfaceType,
  IStore,
  ITypeService,
} from '@codelab/shared/abstract/core'
import { Button, Divider, Row } from 'antd'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { GetActionsList, GetStateList } from '../use-cases'

interface StoreExplorerPaneProps {
  typeService: ITypeService
  actionService: IActionService
  store?: IStore
}

export const StoreExplorerPane = observer<StoreExplorerPaneProps>(
  ({ typeService, actionService, store }) => {
    if (!store) {
      return null
    }

    return (
      <ExplorerPaneTemplate title="Store">
        <Row justify="space-between">
          <p>State</p>
          <Button
            icon={<PlusOutlined />}
            onClick={(event) => {
              event.stopPropagation()
              typeService.fieldCreateModal.open(
                typeRef(store.stateApiId) as Ref<IInterfaceType>,
              )
            }}
            size="small"
            title="Create State"
            type="primary"
          />
        </Row>
        <div style={{ margin: '12px 0px 48px 12px' }}>
          <GetStateList store={store} typeService={typeService} />
        </div>
        <Divider />
        <Row justify="space-between">
          <p>Actions</p>
          <Button
            icon={<PlusOutlined />}
            onClick={(event) => {
              event.stopPropagation()
              actionService.createModal.open()
            }}
            size="small"
            title="Create Action"
            type="primary"
          />
        </Row>
        <div style={{ margin: '12px 0px 48px 12px' }}>
          <GetActionsList actionService={actionService} store={store} />
        </div>
      </ExplorerPaneTemplate>
    )
  },
)
