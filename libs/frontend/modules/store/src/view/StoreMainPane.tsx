import { PlusOutlined } from '@ant-design/icons'
import {
  ACTION_SERVICE,
  RESOURCE_SERVICE,
  STORE_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { typeRef } from '@codelab/frontend/modules/type'
import { IInterfaceType, IStore } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { Button, Collapse } from 'antd'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import {
  CreateActionModal,
  DeleteActionsModal,
  GetActionsList,
  GetStateTree,
  UpdateActionModal,
} from '../use-cases'

interface StoreMainPaneProps
  extends WithServices<
    TYPE_SERVICE | ACTION_SERVICE | RESOURCE_SERVICE | STORE_SERVICE
  > {
  store: Nullish<IStore>
}

export const StoreMainPane = observer<StoreMainPaneProps>(
  ({ typeService, actionService, resourceService, storeService, store }) => {
    if (!store) {
      return null
    }

    return (
      <Collapse defaultActiveKey={['actions', 'state']} ghost>
        <Collapse.Panel
          extra={[
            <Button
              icon={<PlusOutlined />}
              onClick={(event) => {
                event.stopPropagation()
                typeService.fieldCreateModal.open(
                  typeRef(store.stateApiId) as Ref<IInterfaceType>,
                )
              }}
              size="small"
            />,
          ]}
          header={<span css={tw`font-bold`}>State</span>}
          key="state"
        >
          <GetStateTree store={store} typeService={typeService} />
        </Collapse.Panel>
        <Collapse.Panel
          extra={
            <Button
              icon={<PlusOutlined />}
              onClick={(event) => {
                event.stopPropagation()
                actionService.createModal.open()
              }}
              size="small"
            />
          }
          header={<span css={tw`font-bold`}>Actions</span>}
          key="actions"
        >
          <GetActionsList actionService={actionService} store={store} />
          <CreateActionModal
            actionService={actionService}
            resourceService={resourceService}
            store={store}
          />
          <UpdateActionModal
            actionService={actionService}
            resourceService={resourceService}
          />
          <DeleteActionsModal actionService={actionService} />
        </Collapse.Panel>
      </Collapse>
    )
  },
)
