'use client'

import {
  type IRendererModel,
  type IRootRenderer,
} from '@codelab/frontend/abstract/application'
import {
  BUILDER_CONTAINER_ID,
  DATA_ELEMENT_ID,
} from '@codelab/frontend/abstract/domain'
import { useElementService } from '@codelab/frontend-application-element/services'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'
import styled from 'styled-components'

import { BuilderDndContext } from '../../dnd/index'
import { useBuilderHotkeys } from '../../hooks/useBuilderHotkeys.hook'
import { BuilderResizeHandle } from '../base-builder/BuilderResizeHandle'
import { RenderBlueprint } from './RenderBlueprint'

interface IBuilderProps {
  RootRenderer: IRootRenderer
  renderer: IRendererModel
}

/**
 * Generic builder used for both Component & Element
 */
export const BaseBuilder = observer<IBuilderProps>(
  ({ renderer, RootRenderer }) => {
    const { builderService } = useApplicationStore()
    const elementService = useElementService()
    const { selectedNode } = builderService
    const builderContainerRef = useRef<HTMLDivElement>(null)
    const renderContainerRef = useRef<HTMLDivElement>(null)

    useBuilderHotkeys({
      deleteModal: elementService.deletePopover,
      selectedNode,
      setSelectedNode: builderService.setSelectedNode.bind(builderService),
    })

    return (
      <BuilderDndContext>
        <StyledBuilderContainer ref={builderContainerRef}>
          <BuilderResizeHandle>
            <StyledBuilderResizeContainer
              id={BUILDER_CONTAINER_ID}
              key={renderer.id}
            >
              <RootRenderer ref={renderContainerRef} renderer={renderer} />
              <RenderBlueprint
                renderContainerRef={renderContainerRef}
                renderer={renderer}
              />
            </StyledBuilderResizeContainer>
          </BuilderResizeHandle>
        </StyledBuilderContainer>
      </BuilderDndContext>
    )
  },
)

BaseBuilder.displayName = 'BaseBuilder'

const StyledBuilderResizeContainer = styled.div`
  position: relative;
  height: 100%;
  background: transparent;
  border: 2px dotted rgba(170, 170, 170);
  padding: 2px;
  overflow: scroll !important;
  box-sizing: border-box;
`

const StyledBuilderContainer = styled.div`
  // [${DATA_ELEMENT_ID}] is a selector for all rendered elements
  [${DATA_ELEMENT_ID}]:hover {
    cursor: pointer;
  }
  [${DATA_ELEMENT_ID}] {
    // Force all pointer events to be on, because otherwise we won't be able to click to inspect
    // elements that have it disabled by design, like disabled buttons
    pointer-events: all !important;
  }
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: transparent;
  overflow: scroll;
  .ant-modal-mask,
  .ant-modal-wrap {
    position: absolute;
    z-index: 10;
  }
`

StyledBuilderContainer.displayName = 'StyledBuilderContainer'
