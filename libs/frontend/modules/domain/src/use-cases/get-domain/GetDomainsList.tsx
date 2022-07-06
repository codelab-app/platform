import { DisplayIf, ErrorBoundary } from '@codelab/frontend/view/components'
import { padding, threeGridCol } from '@codelab/frontend/view/style'
import { IDomainService } from '@codelab/shared/abstract/core'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateDomainButton } from '../create-domain'
import { GetDomainItem } from './GetDomainsItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export const GetDomainsList = observer<{ domainService: IDomainService }>(
  ({ domainService }) => {
    const domainsList = domainService.domainsList
    const hasDomain = domainsList.length > 0

    return (
      <ErrorBoundary>
        <DisplayIf condition={!hasDomain}>
          <Empty description="No domain found" imageStyle={emptyImageStyle}>
            <CreateDomainButton domainService={domainService}>
              Create Now
            </CreateDomainButton>
          </Empty>
        </DisplayIf>

        <Row gutter={[padding.sm, padding.sm]}>
          {domainsList.map((domain) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Col key={domain.name} {...threeGridCol}>
              <GetDomainItem domain={domain} domainService={domainService} />
            </Col>
          ))}
        </Row>
      </ErrorBoundary>
    )
  },
)
