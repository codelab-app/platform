import type {
  IApp,
  IAppService,
  IDomain,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { isNonNullable } from '@codelab/shared/utils'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import { DomainsList } from './DomainsList'
import { ItemDropdown } from './ItemDropdown'

export interface GetAppsItemProps {
  app: IApp
  appService: IAppService
  domains?: Array<IDomain>
}

export const GetAppsItem = observer<GetAppsItemProps>(({ app, appService }) => {
  const href = { pathname: PageType.PageList, query: { appId: app.id } }

  const appDomains = app.domains
    .map((domain) => domain.maybeCurrent)
    .filter(isNonNullable)

  const Title = <Link href={href}>{app.name}</Link>

  const Dropdown = (
    <ItemDropdown app={app} appService={appService} domains={appDomains} />
  )

  return (
    <Card extra={Dropdown} title={Title}>
      <DomainsList domains={appDomains} />
    </Card>
  )
})
