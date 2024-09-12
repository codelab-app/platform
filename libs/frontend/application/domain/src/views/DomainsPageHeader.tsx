'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import { useCreateDomainModal } from '../use-cases/create-domain/create-domain.state'

export const DomainsPageHeader = observer(() => {
  const createDomainModal = useCreateDomainModal()
  const app = useCurrentApp()

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[{ title: app?.name || '?' }, { title: 'Domains' }]}
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
              cuiKey: UiKey.CreateDomainToolbarItem,
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
