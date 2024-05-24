import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useAppQuery } from '@codelab/frontend/presentation/container'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const DomainsViewHeader = observer(() => {
  const { domainService } = useStore()
  const { appName } = useAppQuery()

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[{ title: appName || '?' }, { title: 'Domains' }]}
        />
      }
      logo={
        <Image
          alt="codelab logo"
          className="size-full"
          preview={false}
          src="/logo.png"
        />
      }
      toolbar={
        <CuiHeaderToolbar
          items={[
            {
              cuiKey: MODEL_ACTION.CreateDomain.key,
              icon: <PlusOutlined />,
              onClick: () => domainService.createModal.open(),
              title: 'Create Domain',
            },
          ]}
          title="Domains toolbar"
        />
      }
    />
  )
})
