'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

export const DomainsPageHeader = observer<{ app: IAppModel }>(({ app }) => {
  const router = useRouter()

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[{ title: app.name }, { title: 'Domains' }]}
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
              cuiKey: UiKey.DomainToolbarItemCreate,
              icon: <PlusOutlined />,
              onClick: () =>
                router.push(PageType.DomainCreate({ appId: app.id })),
              title: 'Create Domain',
            },
          ]}
          title="Domains toolbar"
        />
      }
    />
  )
})
