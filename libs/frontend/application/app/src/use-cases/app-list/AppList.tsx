'use client'

import type {
  IDomainStore,
  IHydrateableData,
} from '@codelab/frontend/abstract/domain'
import { suspensify, useHydrateStore } from '@codelab/frontend/infra/context'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  padding,
  threeGridCol,
} from '@codelab/frontend-presentation-view/style'
import type { IAppDto, IAtomDto } from '@codelab/shared/abstract/core'
import type { AppListQuery, AtomListQuery } from '@codelab/shared/infra/gql'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { use } from 'react'
import { CreateAppButton } from '../create-app'
import { AppListItem } from './AppListItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

interface AppListProps {
  appsDto: IHydrateableData['appsDto']
  atomsDto: IHydrateableData['atomsDto']
}

export const AppList = ({ appsDto, atomsDto }: AppListProps) => {
  const { apps } = useHydrateStore({ appsDto, atomsDto })

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
