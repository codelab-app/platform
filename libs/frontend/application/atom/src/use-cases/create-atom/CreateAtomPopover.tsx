'use client'

import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { withProfiler } from '@sentry/react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useAtomService } from '../../services'
import { CreateAtomForm } from './CreateAtomForm'

export const CreateAtomPopover = withProfiler(
  observer(() => {
    const submitRef = useRef<Maybe<SubmitController>>()
    const { atomPopoverCreate } = useAtomService()
    const router = useRouter()

    return (
      <CuiSidebarSecondary
        id={UiKey.AtomPopoverCreate}
        toolbar={{
          items: [
            {
              cuiKey: UiKey.AtomToolbarItemCreate,
              icon: <SaveOutlined />,
              label: 'Create',
              onClick: () => {
                submitRef.current?.submit()
              },
              title: 'Create',
            },
            {
              cuiKey: UiKey.AtomToolbarItemCreateCancel,
              icon: <CloseOutlined />,
              label: 'Cancel',
              onClick: () => {
                atomPopoverCreate.close(router)
              },
              title: 'Cancel',
            },
          ],
          title: 'Create Atom toolbar',
        }}
      >
        <CreateAtomForm
          onSubmitSuccess={() => atomPopoverCreate.close(router)}
          submitRef={submitRef}
        />
      </CuiSidebarSecondary>
    )
  }),
)
