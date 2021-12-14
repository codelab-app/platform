import {
  TypeKindProvider,
  TypeKindsContext,
} from '@codelab/frontend/modules/type'
import { IElement } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { MouseEventHandler, useCallback, useContext } from 'react'
import { useSelector } from 'react-redux'
import tw from 'twin.macro'
import { BuilderDropHandlers } from './dnd/BuilderDropHandlers'
import { BuilderDropId } from './dnd/BuilderDropId'
import { useCreateElementDroppable } from './dnd/useCreateElementDroppable'
import {
  useBuilderDispatch,
  useBuilderHotkeys,
  useBuilderHoverHandlers,
  useOnRendered,
} from './hooks'
import { Renderer } from './renderer'
import { BuilderClickOverlay, BuilderHoverOverlay } from './sections'
import { builderSelectors } from './store'

export type BuilderProps = {
  tree: ElementTree
  isComponentBuilder?: boolean
}

const StyledBuilderContainer = styled.div`
  // [data-id] is a selector for all rendered elements
  [data-id]:hover {
    cursor: pointer;
  }

  [data-id] {
    // Force all pointer events to be on, because otherwise we won't be able to click to inspect
    // elements that have it disabled by design, like disabled buttons
    pointer-events: all !important;
  }

  position: relative;
  max-height: 100%;

  .ant-modal-mask,
  .ant-modal-wrap {
    position: absolute;
    z-index: 99;
  }
`

const BuilderRenderer = ({
  tree,
  isComponentBuilder,
}: {
  tree: ElementTree
  isComponentBuilder?: boolean
}) => {
  const { typeKindsById } = useContext(TypeKindsContext)
  const { onRendered } = useOnRendered()
  const extraElementProps = useSelector(builderSelectors.extraProps)
  const voidClick = useCallback(() => void 0, [])

  return (
    <Renderer
      isComponentRenderer={isComponentBuilder}
      tree={tree}
      context={{
        onRendered,
        typeKindsById,
        extraElementProps,
        extraProps: {
          onClick: voidClick,
        },
      }}
    />
  )
}

// That's a separate component in order to not re-render the builder whenever
// the dnd position is changed, it causes massive lag
const BuilderDropHandler = ({ root }: { root?: IElement }) => {
  const { setNodeRef } = useCreateElementDroppable(BuilderDropId.BuilderRoot, {
    parentElementId: root?.id,
  })

  return (
    <div
      id="builder-drop-handler"
      css={css`
        ${tw`absolute inset-0`}
        z-index: -1;
      `}
      ref={setNodeRef}
    />
  )
}

/**
 * Wraps around {@link Renderer} to provide element-building functionality
 */
export const Builder = ({
  children,
  tree,
  isComponentBuilder,
}: React.PropsWithChildren<BuilderProps>) => {
  const { selectElement, resetSelection } = useBuilderDispatch()
  const { handleMouseOver, handleMouseLeave } = useBuilderHoverHandlers(tree)

  const root = isComponentBuilder
    ? tree.getRootComponent()
    : tree.getRootElement()

  const handleContainerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // Handle the click-to-select element here, because if we handled it at the react element props level, we won't
    // be able to capture clicks on elements like disabled antd buttons and other ones that are designed not to emit clicks

    // Go up the dom tree to find a element with a node id
    const visit = (element: HTMLElement) => {
      const nodeId = element.dataset?.id
      // Don't allow selection of elements withing a componentId
      const componentId = element.dataset?.componentId

      if (nodeId && !componentId) {
        setSelectedElement(tree.getVertex(nodeId, ElementTree.isElement)?.id)
        e.stopPropagation()
      } else if (element.parentElement && element.id !== 'Builder') {
        // Unless we've reached the top element, or if the next parent is the Builder container, visit the parent
        visit(element.parentElement)
      } else {
        resetSelection()
      }
    }

    visit(e.target as HTMLElement)
  }

  const setSelectedElement = (elementId?: string) => {
    selectElement({ elementId })
  }

  useBuilderHotkeys()

  return (
    <StyledBuilderContainer
      onClick={handleContainerClick}
      id="Builder"
      css={tw`relative w-full h-full bg-white`}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <BuilderDropHandler root={root} />
      <TypeKindProvider>
        <BuilderDropHandlers tree={tree} />
        <BuilderRenderer isComponentBuilder={isComponentBuilder} tree={tree} />
        <BuilderHoverOverlay />
        <BuilderClickOverlay />
        {children}
      </TypeKindProvider>
    </StyledBuilderContainer>
  )
}
