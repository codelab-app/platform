import { observer } from 'mobx-react-lite'
import React from 'react'
import { RenderService } from '../../../renderer'
import { toAntd } from '../../../renderer/utils/platformState'
import { StateTree } from './StateTree'

interface MainPaneMobxStateProps {
  renderService: RenderService
}

export const MainPaneMobxState = observer<MainPaneMobxStateProps>(
  ({ renderService }) => {
    const { platformState } = renderService
    const tree = toAntd(platformState, '')

    return <StateTree parentPath="" state={tree} />
  },
)
