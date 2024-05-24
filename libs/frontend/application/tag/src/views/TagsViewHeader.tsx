import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const TagsViewHeader = observer(() => {
  const { tagService } = useStore()
  const tag = tagService.updateForm.tag

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
})
