'use client'

import {
  type FragmentType,
  graphql,
  useFragment,
} from '@codelab/frontend/infra/gql'
import { getQueryOptions } from '@codelab/frontend/infra/graphql'
import { useUser } from '@codelab/frontend-application-user/services'
import {
  padding,
  threeGridCol,
} from '@codelab/frontend-presentation-view/style'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateAppButton } from '../create-app'
import { type AppList_Query, AppList_query } from './AppList.query'
import { AppListItem } from './AppListItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export const AppList_queryFragment = graphql(`
  fragment AppList_queryFragment on Query {
    apps(options: $options, where: $where) {
      id
      ...AppListItem_appFragment
    }
  }
`)
export type AppList_QueryFragment = FragmentType<typeof AppList_queryFragment>

export const AppList = (props: { query?: AppList_QueryFragment }) => {
  const user = useUser()

  const { data } = useQuery(
    getQueryOptions(AppList_query, {
      where: { owner: { id: user.auth0Id } },
    }),
  )

  /**
   * https://the-guild.dev/blog/unleash-the-power-of-fragments-with-graphql-codegen#compose-all-query-fragments-into-a-single-query-operation
   */
  const query = useFragment(AppList_queryFragment, props.query)
  const apps = query?.apps

  if (!apps?.length) {
    return (
      <Empty description="No apps found" imageStyle={emptyImageStyle}>
        <CreateAppButton>Create Now</CreateAppButton>
      </Empty>
    )
  }

  return (
    <Row gutter={[padding.sm, padding.sm]}>
      {apps.map((app) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Col key={app.id} {...threeGridCol}>
          <AppListItem app={app} />
        </Col>
      ))}
    </Row>
  )
}
