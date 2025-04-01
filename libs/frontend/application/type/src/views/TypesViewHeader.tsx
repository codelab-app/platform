'use client'

import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { UserProfileMenu } from '@codelab/frontend-application-user/components'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Image } from 'antd'
import { useParams } from 'next/navigation'

export const TypesViewHeader = () => {
  const { id } = useParams()
  const { fieldDomainService, typeDomainService } = useDomainStore()
  const type = typeof id === 'string' && typeDomainService.types.get(id)?.name
  const field = typeof id === 'string' && fieldDomainService.getField(id)?.key
  const typeOrField = type ? 'type' : field ? 'field' : ''

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[
            { title: 'Types' },
            { title: typeOrField },
            { title: type ?? field },
          ]}
        />
      }
      logo={
        <Image
          alt="codelab logo"
          className="size-full"
          preview={false}
          src="/logo.png"
        />
      }
      userMenu={<UserProfileMenu />}
    />
  )
}
