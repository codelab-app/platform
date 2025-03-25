'use client'

import type {
  IBuilderRouteContext,
  IRendererModel,
  IRootRenderer,
} from '@codelab/frontend/abstract/application'

import {
  BUILDER_CONTAINER_ID,
  DATA_ELEMENT_ID,
} from '@codelab/frontend/abstract/domain'
import { ApplicationStoreHydrator } from '@codelab/frontend/infra/context'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import { useRef } from 'react'
import styled from 'styled-components'

import { BuilderDndContext } from '../../dnd/index'
import { useBuilderHotkeys } from '../../hooks/useBuilderHotkeys.hook'
import { useInitializeSearchParams } from '../../hooks/useInitializeSearchParams.hook'
import { BuilderResizeHandle } from '../base-builder/BuilderResizeHandle'
import { RenderBlueprint } from './RenderBlueprint'

interface IBuilderProps {
  RootRenderer: IRootRenderer
  context: IBuilderRouteContext
  renderer: IRendererModel
}

/**
 * Generic builder used for both Component & Element
 */
export const BaseBuilder = observer<IBuilderProps>(
  ({ context, renderer, RootRenderer }) => {
    const { builderService } = useApplicationStore()
    const { selectedNode } = builderService
    const builderContainerRef = useRef<HTMLDivElement>(null)
    const renderContainerRef = useRef<HTMLDivElement>(null)

    useBuilderHotkeys({
      context,
      selectedNode,
      setSelectedNode: builderService.setSelectedNode.bind(builderService),
    })

    useInitializeSearchParams()

    return (
      <ApplicationStoreHydrator>
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
      </ApplicationStoreHydrator>
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
