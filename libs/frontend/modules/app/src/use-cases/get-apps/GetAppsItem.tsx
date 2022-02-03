import { PageType } from '@codelab/frontend/abstract/types'
import { Card } from 'antd'
import Link from 'next/link'
import { GetAppsQuery } from '../../graphql/App.endpoints.v2.graphql.gen'
import { AppFragment } from '../../graphql/App.fragment.v2.graphql.gen'
import { ItemDropdown } from './ItemDropdown'

export const GetAppsItem = ({ app }: { app: AppFragment }) => {
  if (!app) {
    return null
  }

  const href = {
    pathname: PageType.PageList,
    query: { appId: app.id },
  }

  const Title = (
    <Link href={href}>
      <a>{app.name}</a>
    </Link>
  )

  return <Card extra={<ItemDropdown app={app} />} title={Title} />
}
