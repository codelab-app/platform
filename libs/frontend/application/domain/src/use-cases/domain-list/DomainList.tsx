'use client'

import type { IDomainModel } from '@codelab/frontend/abstract/domain'

import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { ErrorBoundary } from '@codelab/frontend-presentation-view/components/errorBoundary'
import {
  padding,
  threeGridCol,
} from '@codelab/frontend-presentation-view/style'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'

import { CreateDomainButton } from '../create-domain'
import { DomainListItem } from './DomainListItem/DomainListItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

interface DomainListProps {
  appId: string
  domains: Array<IDomainModel>
}

export const DomainList = observer<DomainListProps>(({ appId, domains }) => {
  return (
    <ErrorBoundary>
      <DisplayIf condition={domains.length === 0}>
        <Empty
          description="No domain found"
          styles={{ image: emptyImageStyle }}
        >
          <CreateDomainButton appId={appId}>Create Now</CreateDomainButton>
        </Empty>
      </DisplayIf>

      <Row gutter={[padding.sm, padding.sm]}>
        {domains.map((domain) => {
          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Col key={domain.name} {...threeGridCol}>
              <DomainListItem domain={domain} />
            </Col>
          )
        })}
      </Row>
    </ErrorBoundary>
  )
})
