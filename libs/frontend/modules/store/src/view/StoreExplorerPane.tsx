import { PlusOutlined } from '@ant-design/icons'
import {
  ACTION_SERVICE,
  APP_SERVICE,
  STORE_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { typeRef } from '@codelab/frontend/modules/type'
import { IInterfaceType } from '@codelab/shared/abstract/core'
import { Button, Collapse } from 'antd'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { useCurrentStore } from '../hooks'
import { GetActionsList, GetStateList } from '../use-cases'

type StoreExplorerPaneProps = WithServices<
  TYPE_SERVICE | ACTION_SERVICE | APP_SERVICE | STORE_SERVICE
>

export const StoreExplorerPane = observer<StoreExplorerPaneProps>(
  ({ typeService, actionService, appService, storeService }) => {
    const { store } = useCurrentStore(appService, storeService)

    if (!store) {
      return null
    }

    const StateButton = (
      <Button
        icon={<PlusOutlined />}
        onClick={(event) => {
          event.stopPropagation()
          typeService.fieldCreateModal.open(
            typeRef(store.stateApiId) as Ref<IInterfaceType>,
          )
        }}
        size="small"
        type="primary"
      />
    )

    const ActionButton = (
      <Button
        icon={<PlusOutlined />}
        onClick={(event) => {
          event.stopPropagation()
          actionService.createModal.open()
        }}
        size="small"
        type="primary"
      />
    )

    return (
      <Collapse defaultActiveKey={['actions', 'state']} ghost>
        <Collapse.Panel
          extra={[StateButton]}
          header={<p css={tw`font-bold`}>State</p>}
          key="state"
        >
          <GetStateList store={store} typeService={typeService} />
        </Collapse.Panel>
        <Collapse.Panel
          extra={[ActionButton]}
          header={<p css={tw`font-bold`}>Actions</p>}
          key="actions"
        >
          <GetActionsList actionService={actionService} store={store} />
        </Collapse.Panel>
      </Collapse>
    )
  },
)
