'use client'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
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

export const DomainList = observer(() => {
  const { domainDomainService } = useDomainStore()
  const domains = domainDomainService.domainsList

  return (
    <ErrorBoundary>
      <DisplayIf condition={domains.length === 0}>
        <Empty description="No domain found" imageStyle={emptyImageStyle}>
          <CreateDomainButton>Create Now</CreateDomainButton>
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
