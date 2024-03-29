import LinkOutlined from '@ant-design/icons/LinkOutlined'
import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import { Alert, Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import { ItemTools } from '../ItemTools'
import { ConfigGuide } from './ConfigGuideTab'
import { ConfigStatus } from './ConfigStatus'
import { hideAntBody } from './get-domains-item.styles'

export interface GetAppsItemProps {
  domain: IDomainModel
}

export const GetDomainItem = observer<GetAppsItemProps>(({ domain }) => {
  const { domainConfig, projectDomain } = domain
  const url = `https://${domain.name}`

  const Title = (
    <div>
      <Link href={url}>
        <span>
          {domain.name} <LinkOutlined />
        </span>
      </Link>
      <ConfigStatus
        misconfigured={!projectDomain?.verified || domainConfig?.misconfigured}
      />
    </div>
  )

  return (
    <Card css={hideAntBody} extra={<ItemTools domain={domain} />} title={Title}>
      {!projectDomain?.verified && (
        <Alert
          description="Domain misconfigured because it's already assigned to another project."
          message="Error"
          showIcon
          type="error"
        />
      )}
      {projectDomain?.verified && domainConfig?.misconfigured && (
        <ConfigGuide domain={domain} type="ARecord" />
      )}
    </Card>
  )
})
