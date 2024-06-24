import type { IAppDto } from '@codelab/shared/abstract/core'
import { Card } from 'antd'
import Link from 'next/link'
import React from 'react'
import { AppListItemDropdown } from './AppListItemDropdown'
import { DomainList } from './DomainList'

export interface AppListItemProps {
  app: IAppDto
}

export const AppListItem = ({ app }: AppListItemProps) => {
  const Title = <Link href="/apps">{app.name}</Link>
  const Dropdown = <AppListItemDropdown app={app} />

  return (
    <Card extra={Dropdown} title={Title}>
      <DomainList app={app} />
    </Card>
  )
}
