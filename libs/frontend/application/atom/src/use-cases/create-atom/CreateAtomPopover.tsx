'use client'

import type { IAtomCreateRoute } from '@codelab/frontend/abstract/application'
import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useAtomService } from '../../services'
import { CreateAtomForm } from './CreateAtomForm'

export const CreateAtomPopover = ({
  context,
}: {
  context: IAtomCreateRoute
}) => {
  const submitRef = useRef<Maybe<SubmitController>>(undefined)
  const { createPopover } = useAtomService()
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
              createPopover.close(router, context)
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Atom toolbar',
      }}
    >
      <CreateAtomForm
        onSubmitSuccess={() => createPopover.close(router, context)}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
}
