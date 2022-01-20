import { PageType } from '@codelab/frontend/model/store/router'
import { Card } from 'antd'
import Link from 'next/link'
import {
  GetAppQuery,
  GetAppsQuery,
} from '../../graphql/App.endpoints.graphql.gen'
import { ItemDropdown } from './ItemDropdown'

export const GetAppsItem = ({ app }: GetAppQuery) => {
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
