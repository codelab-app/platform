import { toAntd } from '@codelab/frontend/modules/store'
import { IBuilderService, IRenderer } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { MobxStateModal } from './MobxStateModal'
import { MobxStateTree } from './MobxStateTree'

type MobxStateContainerProps = {
  renderer: IRenderer
  builderService: IBuilderService
}

export const MobxStateContainer = observer<MobxStateContainerProps>(
  ({ builderService, renderer }) => {
    const { platformState } = renderer
    const tree = toAntd(platformState, '')

    return (
      <>
        <MobxStateModal
          close={builderService.stateModal.close}
          isOpen={builderService.stateModal.isOpen}
          node={builderService.stateModal.node}
        />
        <MobxStateTree
          builderService={builderService}
          parentPath=""
          state={tree}
        />
      </>
    )
  },
)
