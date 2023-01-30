import { LinkOutlined } from '@ant-design/icons'
import type { IDomain, IDomainService } from '@codelab/frontend/abstract/core'
import { Alert, Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import { ItemTools } from '../ItemTools'
import { ConfigGuide } from './ConfigGuideTab'
import { ConfigStatus } from './ConfigStatus'
import { hideAntBody } from './GetDomainsItem.styles'

export interface GetAppsItemProps {
  domain: IDomain
  domainService: IDomainService
}

export const GetDomainItem = observer<GetAppsItemProps>(
  ({ domain, domainService }) => {
    const {
      domainConfig: { misconfigured },
      projectDomain: { verified },
    } = domain

    const url = `https://${domain.name}`

    const Title = (
      <div>
        <Link href={url}>
          <span>
            {domain.name} <LinkOutlined />
          </span>
        </Link>
        <ConfigStatus misconfigured={!verified || misconfigured} />
      </div>
    )

    return (
      <Card
        css={hideAntBody}
        extra={<ItemTools domain={domain} domainService={domainService} />}
        title={Title}
      >
        {!verified && (
          <Alert
            description="Domain misconfigured because it's already assigned to another project."
            message="Error"
            showIcon
            type="error"
          />
        )}
        {verified && misconfigured && (
          <ConfigGuide domain={domain} type="ARecord" />
        )}
      </Card>
    )
  },
)
