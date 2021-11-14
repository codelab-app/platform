import { PageType } from '@codelab/frontend/model/state/router'
import { Card } from 'antd'
import Link from 'next/link'
import { AppFragment } from '../../graphql/App.fragment.graphql.gen'
import { ItemDropdown } from './ItemDropdown'

export type GetAppsItemProps = {
  app: AppFragment
}

export const GetAppsItem = ({ app }: GetAppsItemProps) => {
  const href = {
    pathname: PageType.PageList,
    query: { appId: app.id },
  }

  const Title = (
    <Link href={href}>
      <a>{app.name}</a>
    </Link>
  )

  return <Card title={Title} extra={<ItemDropdown app={app} />} />
}
