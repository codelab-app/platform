import { Button } from 'antd'
import React, { useRef } from 'react'
import { CreateAtomForm } from './createAtom/CreateAtomForm'
import { useAtom } from './useAtom'
import { SubmitController } from '@codelab/frontend/shared'
import {
  LayoutPaneVisibility,
  PaneDetailTemplate,
} from '@codelab/frontend/layout'

export const AtomContainerCreate = () => {
  const submitRef = useRef<SubmitController | undefined>()
  const { resetAtom } = useAtom()

  return (
    <PaneDetailTemplate
      header={
        <>
          <Button onClick={() => resetAtom(LayoutPaneVisibility.Main)}>
            Close
          </Button>
          <Button type="primary" onClick={() => submitRef.current?.submit()}>
            Add
          </Button>
        </>
      }
    >
      <CreateAtomForm
        submitRef={submitRef}
        onSubmitSuccess={() => resetAtom(LayoutPaneVisibility.Main)}
      />
    </PaneDetailTemplate>
  )
}
