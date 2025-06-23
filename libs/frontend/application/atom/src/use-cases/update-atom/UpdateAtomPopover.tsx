'use client'

import type { IAtomUpdateRoute } from '@codelab/frontend-abstract-application'
import type { IAtomModel } from '@codelab/frontend-abstract-domain'
import type { Maybe } from '@codelab/shared-abstract-types'
import type { MutableRefObject } from 'react'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend-abstract-types'
import { CuiSidebarSecondary } from '@codelab/frontend-presentation-codelab-ui'
import { useRouter } from 'next/navigation'

import { useAtomService } from '../../services'
import { UpdateAtomForm } from './UpdateAtomForm'

interface UpdateAtomPopoverProps {
  atom: IAtomModel
  context: IAtomUpdateRoute
  submitRef: MutableRefObject<Maybe<SubmitController>>
}

export const UpdateAtomPopover = ({
  atom,
  context,
  submitRef,
}: UpdateAtomPopoverProps) => {
  const { updatePopover } = useAtomService()
  const router = useRouter()

  return (
    <CuiSidebarSecondary
      id={UiKey.AtomPopoverUpdate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.AtomToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Update',
          },
          {
            cuiKey: UiKey.AtomToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              updatePopover.close(router, context)
            },
            title: 'Cancel',
          },
        ],
        title: 'Update Atom toolbar',
      }}
    >
      <UpdateAtomForm
        atom={atom}
        onSubmitSuccess={() => updatePopover.close(router, context)}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
}

UpdateAtomPopover.displayName = 'UpdateAtomPopover'
