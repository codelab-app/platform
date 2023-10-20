import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import { DomainsList } from './DomainsList'
import type { ItemMenuProps } from './ItemDropdown'
import { ItemDropdown } from './ItemDropdown'

export const GetAppsItem = observer<ItemMenuProps>(({ app }) => {
  const { userService } = useStore()

  const href = {
    pathname: PageType.PageBuilder,
    query: {
      appSlug: app.slug,
      pageSlug: app.pages[0]?.slug,
      primarySidebarKey: ExplorerPaneType.PageList,
      userSlug: userService.user.username,
    },
  }

  const domains = app.domains.map((domain) => domain)
  const Title = <Link href={href}>{app.name}</Link>
  const Dropdown = <ItemDropdown app={app} />

  return (
    <Card extra={Dropdown} title={Title}>
      <DomainsList domains={domains} />
    </Card>
  )
})
