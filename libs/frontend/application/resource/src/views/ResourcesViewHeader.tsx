import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const ResourcesViewHeader = observer(() => {
  const { resourceService } = useStore()
  const resource = resourceService.updateForm.resource

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[{ title: 'Resources' }, { title: resource?.name || '' }]}
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
    />
  )
})
