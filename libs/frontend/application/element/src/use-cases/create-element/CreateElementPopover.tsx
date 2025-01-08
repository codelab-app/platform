'use client'

import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { logger } from '@codelab/frontend/infra/logger'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { tracker } from '@codelab/frontend/infra/logger'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useElementService } from '../../services/element.service'
import { CreateElementForm } from './CreateElementForm'

export const CreateElementPopover = observer(() => {
  const router = useRouter()
  const submitRef = useRef<Maybe<SubmitController>>()
  const { createPopover } = useElementService()
  const { builderService } = useApplicationStore()
  /**
   * Maybe current is a code smell, since we are using parallel routes, the selected node may not be set yet, since init builder is what sets it.
   */
  const selectedNode = builderService.selectedNode?.maybeCurrent

  // tracker.useModelDiff('Selected node popover', selectedNode)
  // logger.debug('Selected node popover', selectedNode)
  tracker.useRenderedCount('CreateElementPopover')

  return (
    <CuiSidebarSecondary
      id={UiKey.ElementPopoverCreate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.ElementToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => submitRef.current?.submit(),
          },
          {
            cuiKey: UiKey.ElementToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => createPopover.close(router),
          },
        ],
        title: 'Create Element toolbar',
      }}
    >
      <CreateElementForm
        onSubmitSuccess={() => createPopover.close(router)}
        selectedNode={selectedNode}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
})
