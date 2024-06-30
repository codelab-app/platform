'use client'

import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import {
  padding,
  threeGridCol,
} from '@codelab/frontend-presentation-view/style'
import type { IAppDto, IAtomDto } from '@codelab/shared/abstract/core'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect } from 'react'
import { CreateAppButton } from '../create-app'
import { AppListItem } from './AppListItem'

export interface AppListProps {
  apps: Array<IAppDto>
  atoms: Array<IAtomDto>
}

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export const AppList = observer<AppListProps>(({ apps, atoms }) => {
  const { appDomainService, atomDomainService, pageDomainService } =
    useDomainStore()

  useEffect(() => {
    hydrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apps, atoms])

  const hydrate = useCallback(() => {
    apps
      .flatMap((app) => {
        appDomainService.hydrate(app)

        return app.pages || []
      })
      .forEach((page) => {
        pageDomainService.hydrate(page)
      })

    atoms.forEach((atom) => {
      atomDomainService.hydrate(atom)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apps, atoms])

  if (!appDomainService.appsList.length) {
    return (
      <Empty description="No apps found" imageStyle={emptyImageStyle}>
        <CreateAppButton>Create Now</CreateAppButton>
      </Empty>
    )
  }

  return (
    <Row gutter={[padding.sm, padding.sm]}>
      {appDomainService.appsList.map((app) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Col key={app.id} {...threeGridCol}>
          <AppListItem app={app} />
        </Col>
      ))}
    </Row>
  )
})
