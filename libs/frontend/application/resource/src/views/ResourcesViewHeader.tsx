'use client'

import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import { useUpdateResourceForm } from '../use-cases/update-resource'

export const ResourcesViewHeader = observer(() => {
  const updateResourceForm = useUpdateResourceForm()
  const resource = updateResourceForm.data

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
