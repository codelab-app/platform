import { PlusOutlined } from '@ant-design/icons'
import { TYPE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { typeRef } from '@codelab/frontend/modules/type'
import { IInterfaceType, IStore } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { Button, Collapse } from 'antd'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { GetStateTree } from '../use-cases'

interface StoreMainPaneProps extends WithServices<TYPE_SERVICE> {
  store: Nullish<IStore>
}

export const StoreMainPane = observer<StoreMainPaneProps>(
  ({ typeService, store }) => {
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
              }}
              size="small"
            />
          }
          header={<span css={tw`font-bold`}>Actions</span>}
          key="actions"
        >
          Here comes actions
        </Collapse.Panel>
      </Collapse>
    )
  },
)
