import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import type { IDomain } from '@codelab/frontend/abstract/core'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'

export interface DomainListProps {
  domains: Array<IDomain>
}

export const DomainsList = ({ domains }: DomainListProps) => {
  if (!domains.length) {
    return <div css={tw`text-red-400`}>No domains assigned</div>
  }

  return (
    <>
      {domains.map((domain) => {
        const { name, domainConfig, projectDomain } = domain
        const valid = projectDomain?.verified && !domainConfig?.misconfigured

        const badge = valid ? (
          <span css={tw`text-green-400 flex items-center`}>
            <CheckCircleOutlined css={tw`mr-1`} /> Valid
          </span>
        ) : (
          <span css={tw`text-red-400 flex items-center`}>
            <CloseCircleOutlined css={tw`mr-1`} /> Invalid
          </span>
        )

        return (
          <div css={tw`text-sm flex items-center justify-between`}>
            <Link href={`https://${name}`}>
              <span>
                {name} <LinkOutlined />
              </span>
            </Link>

            {badge}
          </div>
        )
      })}
    </>
  )
}
