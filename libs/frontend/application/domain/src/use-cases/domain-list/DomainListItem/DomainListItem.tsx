'use client'

import LinkOutlined from '@ant-design/icons/LinkOutlined'
import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import { css } from 'styled-components'
import { ItemTools } from '../ItemTools/ItemTools'
import { ConfigGuide } from './ConfigGuideTab/ConfigGuideTab'
import { ConfigStatus } from './ConfigStatus'

export interface DomainListItemProps {
  domain: IDomainModel
}

const hideAntBody = css`
  :global {
    body {
      display: none;
    }
  }
`

export const DomainListItem = observer<DomainListItemProps>(({ domain }) => {
  const { domainConfig } = domain
  const url = `https://${domain.name}`
  const { misconfigured } = domainConfig ?? {}

  const Title = (
    <div>
      <Link href={url}>
        <span>
          {domain.name} <LinkOutlined />
        </span>
      </Link>
      <ConfigStatus misconfigured={misconfigured} />
    </div>
  )

  return (
    <Card css={hideAntBody} extra={<ItemTools domain={domain} />} title={Title}>
      {misconfigured && <ConfigGuide domain={domain} type="ARecord" />}
    </Card>
  )
})
