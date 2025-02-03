'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'

import {
  padding,
  threeGridCol,
} from '@codelab/frontend-presentation-view/style'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'

import { AppButtonOpenCreateForm } from '../create-app'
import { AppListItem } from './AppListItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export const AppList = observer(({ apps }: { apps: Array<IAppModel> }) => {
  if (!apps.length) {
    return (
      <Empty description="No apps found" styles={{ image: emptyImageStyle }}>
        <AppButtonOpenCreateForm>Create Now</AppButtonOpenCreateForm>
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
})
