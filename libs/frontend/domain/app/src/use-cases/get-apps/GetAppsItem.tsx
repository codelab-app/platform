import type { IApp, IDomain } from '@codelab/frontend/abstract/core'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presentation/container'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import { DomainsList } from './DomainsList'
import { ItemDropdown } from './ItemDropdown'

export interface GetAppsItemProps {
  app: IApp
  domains?: Array<IDomain>
}

export const GetAppsItem = observer<GetAppsItemProps>(({ app }) => {
  const { userService } = useStore()

  const href = {
    pathname: PageType.PageBuilder,
    query: {
      appId: app.id,
      explorerPaneKey: ExplorerPaneType.PageList,
      pageName: app.pages[0]?.current.name,
      primarySidebarKey: ExplorerPaneType.PageList,
      userName: userService.user.username,
    },
  }

  const domains = app.domains.map((domain) => domain.current)
  const Title = <Link href={href}>{app.name}</Link>
  const Dropdown = <ItemDropdown app={app} domains={domains} />

  return (
    <Card extra={Dropdown} title={Title}>
      <DomainsList domains={domains} />
    </Card>
  )
})
