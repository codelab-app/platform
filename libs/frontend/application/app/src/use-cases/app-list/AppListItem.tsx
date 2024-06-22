import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import { AppListItemDropdown } from './AppListItem__Dropdown'
import { DomainList } from './DomainList'

export const AppListItem = observer<{
  app: IAppModel
}>(({ app }) => {
  const Title = <Link href="/apps">{app.name}</Link>
  const Dropdown = <AppListItemDropdown app={app} />

  return (
    <Card extra={Dropdown} title={Title}>
      <DomainList app={app} />
    </Card>
  )
})
