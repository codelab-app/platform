import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import {
  type FragmentType,
  graphql,
  useFragment,
} from '@codelab/frontend/infra/gql'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { useUser } from '@codelab/frontend-application-user/services'
import { Card } from 'antd'
import Link from 'next/link'
import React from 'react'
import { AppListItemDropdown } from './AppListItem__Dropdown'
import { DomainList } from './DomainList'

interface AppListItemProps {
  app: AppListItem_AppFragment
}

export const AppListItem_appFragment = graphql(`
  fragment AppListItem_appFragment on App {
    id
    name
    slug
    domains {
      id
      domainConfig {
        misconfigured
      }
    }
    ...DomainList_appFragment
    pages {
      slug
    }
  }
`)

export type AppListItem_AppFragment = FragmentType<
  typeof AppListItem_appFragment
>

export const AppListItem = (props: AppListItemProps) => {
  const app = useFragment(AppListItem_appFragment, props.app)
  const { username } = useUser()

  const href = {
    pathname: PageType.PageBuilder,
    query: {
      appSlug: app.slug,
      pageSlug: app.pages[0]?.slug,
      primarySidebarKey: ExplorerPaneType.PageList,
      userSlug: username,
    },
  }

  const Title = <Link href={href}>{app.name}</Link>
  const Dropdown = <AppListItemDropdown app={props.app} />

  return (
    <Card extra={Dropdown} title={Title}>
      <DomainList app={app} />
    </Card>
  )
}
