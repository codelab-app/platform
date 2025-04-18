'use client'

import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend-presentation-codelab-ui'
import { UserProfileMenu } from '@codelab/frontend-application-user/components'
import { Image } from 'antd'

export const AtomsViewHeader = () => {
  // const atomToUpdate = updateAtomForm.data?.name || ''
  // const fieldToUpdate = updateFieldForm.data?.key || ''

  // const atomOrField = updateAtomForm.isOpen
  //   ? 'atom'
  //   : updateFieldForm.isOpen
  //   ? 'field'
  //   : ''

  // const atomOrFieldName = updateAtomForm.isOpen ? atomToUpdate : fieldToUpdate

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[
            { title: 'Atoms' },
            // { title: atomOrField },
            // { title: atomOrFieldName },
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
