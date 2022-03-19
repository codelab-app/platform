import { DATA_ID } from '@codelab/frontend/abstract/core'
import { WithElementService } from '@codelab/frontend/modules/element'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { BuilderDropHandler } from './dnd/BuilderDropHandler'
import { ElementDropHandlers } from './dnd/ElementDropHandlers'
import { useBuilderHotkeys, useBuilderHoverHandlers } from './hooks'
import { useBuilderRootClickHandler } from './hooks/useBuilderRootClickHandler'
import { Renderer } from './renderer'
import { WithBuilderService } from './store/BuilderService'

export interface BuilderProps {
  typeService: TypeService
  isComponentBuilder?: boolean
}

const StyledBuilderContainer = styled.div`
  // [${DATA_ID}] is a selector for all rendered elements
  [${DATA_ID}]:hover {
    cursor: pointer;
  }
  [${DATA_ID}] {
    // Force all pointer events to be on, because otherwise we won't be able to click to inspect
    // elements that have it disabled by design, like disabled buttons
    pointer-events: all !important;
  }
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
  max-height: 100%;
  .ant-modal-mask,
  .ant-modal-wrap {
    position: absolute;
    z-index: 10;
  }
`

const BuilderRenderer = observer(
  ({
    tree,
    typeService,
    isComponentBuilder,
  }: {
    typeService: TypeService
    tree: ElementTree
    isComponentBuilder?: boolean
  }) => {
    const { onRendered } = useOnRendered()
    const extraElementProps = useSelector(builderSelectors.extraProps)
    const voidClick = useCallback(() => void 0, [])
    const { typesById } = useTypesByIdQuery(typeService)

    return (
      <Renderer
        context={{
          onRendered,
          extraElementProps,
          extraProps: {
            onClick: voidClick,
          },
        }}
        isComponentRenderer={isComponentBuilder}
        tree={tree}
        typesById={typesById}
      />
    )
  },
)

// That's a separate component in order to not re-render the builder whenever
// the dnd position is changed, it causes massive lag
const BuilderDropHandler = ({ root }: { root?: IElement }) => {
  const { setNodeRef } = useCreateElementDroppable(BuilderDropId.BuilderRoot, {
    parentElementId: root?.id as string,
  })

  return (
    <div
      css={css`
        ${tw`absolute inset-0`}
        z-index: -1;
      `}
      id="builder-drop-handler"
      ref={setNodeRef}
    />
  )
}

/**
 * Wraps around {@link Renderer} to provide element-building functionality
 */
export const Builder = observer(
  ({
    typeService,
    children,
    isComponentBuilder,
  }: React.PropsWithChildren<BuilderProps>) => {
    const { selectElement, resetSelection } = useBuilderDispatch()

    const { handleMouseOver, handleMouseLeave } =
      useBuilderHoverHandlers(elementStore)

    const root = isComponentBuilder
      ? tree.getRootComponent()
      : tree.getRootElement()

    const handleContainerClick: MouseEventHandler<HTMLDivElement> = (e) => {
      // Handle the click-to-select element here, because if we handled it at the react element props level, we won't
      // be able to capture clicks on elements like disabled antd buttons and other ones that are designed not to emit clicks

      // Go up the dom tree to find a element with a node id
      const visit = (element: HTMLElement) => {
        const nodeId = element.dataset?.['id']
        // Don't allow selection of elements withing a componentId
        const componentId = element.dataset?.['componentId']

        if (nodeId && !componentId) {
          setSelectedElement(nodeId)
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
        css={tw`relative w-full h-full bg-white`}
        id="Builder"
        onClick={handleContainerClick}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
      >
        <BuilderDropHandler root={root} />
        <BuilderDropHandlers tree={tree} />
        <BuilderRenderer
          isComponentBuilder={isComponentBuilder}
          tree={elementTree}
          typeService={typeService}
        />
        <BuilderHoverOverlay />
        <BuilderClickOverlay />
        {children}
      </StyledBuilderContainer>
    )
  },
)
