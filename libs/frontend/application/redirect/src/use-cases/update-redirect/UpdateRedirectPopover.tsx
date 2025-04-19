import type { PageContextParams } from '@codelab/frontend-abstract-application'
import type { Maybe } from '@codelab/shared-abstract-types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend-abstract-types'
import { CuiSidebarSecondary } from '@codelab/frontend-presentation-codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useRedirectService } from '../../services/redirect.service'
import { UpdateRedirectForm } from './UpdateRedirectForm'

export const UpdateRedirectPopover = observer<{
  redirectId: string
  params: PageContextParams
}>(({ params, redirectId }) => {
  const submitRef = useRef<Maybe<SubmitController>>(undefined)
  const { updatePopover } = useRedirectService()
  const router = useRouter()

  return (
    <CuiSidebarSecondary
      id={UiKey.RedirectPopoverUpdate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.RedirectToolbarItemUpdate,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => submitRef.current?.submit(),
          },
          {
            cuiKey: UiKey.RedirectToolbarItemUpdateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => updatePopover.close(router, params),
          },
        ],
        title: 'Update Redirect toolbar',
      }}
    >
      <UpdateRedirectForm
        onSubmitSuccess={() => updatePopover.close(router, params)}
        params={params}
        redirectId={redirectId}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
})
