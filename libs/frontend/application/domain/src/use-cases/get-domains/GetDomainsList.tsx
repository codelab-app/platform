'use client'

import { useCurrentApp } from '@codelab/frontend/presentation/container'
import {
  useDomainStore,
  useStore,
} from '@codelab/frontend-application-shared-store/provider'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { ErrorBoundary } from '@codelab/frontend-presentation-view/components/errorBoundary'
import {
  padding,
  threeGridCol,
} from '@codelab/frontend-presentation-view/style'
import type { IDomainDto } from '@codelab/shared/abstract/core'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateDomainButton } from '../create-domain'
import { domainListUseCase } from './get-domains.use-case'
import { GetDomainItem } from './GetDomainsItem/GetDomainsItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

interface DomainListProps {
  domains: Array<IDomainDto>
}

export const GetDomainsList = observer(({ domains }: DomainListProps) => {
  const { domainDomainService } = useDomainStore()

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
              <GetDomainItem domain={domainDomainService.hydrate(domain)} />
            </Col>
          )
        })}
      </Row>
    </ErrorBoundary>
  )
})
