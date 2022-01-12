import { PageType } from '@codelab/frontend/model/store/router'
import { Card } from 'antd'
import Link from 'next/link'
import { ItemDropdown } from './ItemDropdown'
import { GetAppsItemProps } from './types'

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
