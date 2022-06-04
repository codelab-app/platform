import { PlusOutlined } from '@ant-design/icons'
import {
  APP_SERVICE,
  STORE_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { useCurrentApp } from '@codelab/frontend/modules/app'
import { Button, Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'next/router'
import tw from 'twin.macro'
import { GetStateTree } from '../use-cases'

export const StoreMainPane = observer<
  WithServices<STORE_SERVICE | APP_SERVICE | TYPE_SERVICE>
>(({ storeService, appService, typeService }) => {
  const { app } = useCurrentApp(appService)

  if (!app) {
    return null
  }

  const store = storeService.store(app.store.id)

  return (
    <Collapse defaultActiveKey={['actions', 'state']} ghost>
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
        header={<span css={tw`font-bold`}>State</span>}
        key="state"
      >
        {store && <GetStateTree store={store} typeService={typeService} />}
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
})
