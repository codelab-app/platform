import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { Image } from 'antd'
import React from 'react'
import { useUpdateTagForm } from '../use-cases/update-tag'

export const TagsViewHeader = () => {
  const updateTagForm = useUpdateTagForm()
  const tag = updateTagForm.data

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[{ title: 'Tags' }, { title: tag?.name || '' }]}
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
}
