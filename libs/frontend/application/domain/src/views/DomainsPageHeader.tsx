'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useAppQuery } from '@codelab/frontend/presentation/container'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useCreateDomainModal } from '../use-cases/create-domain/create-domain.state'

export const DomainsPageHeader = observer(() => {
  const createDomainModal = useCreateDomainModal()
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
              onClick: () => createDomainModal.open(),
              title: 'Create Domain',
            },
          ]}
          title="Domains toolbar"
        />
      }
    />
  )
})
