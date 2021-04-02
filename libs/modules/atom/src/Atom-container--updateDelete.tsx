import React, { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { DeleteAtomButton } from './deleteAtom/DeleteAtomButton'
import { UpdateAtomForm } from './updateAtom/UpdateAtomForm'
import { atomState, useAtom } from './useAtom'
import {
  LayoutPaneVisibility,
  PaneDetailTemplate,
} from '@codelab/frontend/layout'
import { SubmitController, SubmitRefButton } from '@codelab/frontend/shared'

export const AtomContainerUpdateDelete = () => {
  const submitRef = useRef<SubmitController | undefined>()
  const atomHook = useAtom()
  const onSuccess = () => atomHook.resetAtom(LayoutPaneVisibility.Main)
  const [detailAtomId] = useRecoilState(atomState)

  return (
    <PaneDetailTemplate
      header={
        <>
          <DeleteAtomButton onSuccess={onSuccess} />
          <SubmitRefButton submitRef={submitRef} />
        </>
      }
    >
      <UpdateAtomForm
        atomId={detailAtomId}
        submitRef={submitRef}
        onSubmitSuccess={onSuccess}
      />
    </PaneDetailTemplate>
  )
}
