import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import type { Rect } from '@codelab/frontend/shared/utils'
import type { Nullable } from '@codelab/shared/abstract/types'

import { useScroll, useScrollIntoView } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import { type CSSProperties, useMemo } from 'react'
import styled from 'styled-components'

import { DeleteButton } from './DeleteButton'
import { DragButton } from './DragButton'
import { EditTextButton } from './EditTextButton'

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-height: 20px;
  justify-content: space-between;
  & > *:not(:last-child) {
    margin-right: 0.3rem;
  }
`

const ToolbarTitle = styled.p`
  height: 20px;
  min-width: 50px;
  margin: 2px;
  overflow: hidden;
  white-space: nowrap;
`

const ToolbarButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`

export const TOOLBAR_HEIGHT = 30

export const BuilderElementToolbar = observer<{
  runtimeElement: IRuntimeElementModel
  container: HTMLElement
  domElement: Nullable<HTMLElement>
  containerRect: Rect
  rect: Rect
}>(({ container, containerRect, domElement, rect, runtimeElement }) => {
  const element = runtimeElement.element.current

  useScrollIntoView(domElement, container)
  useScroll()

  const toolbarStyle: CSSProperties = useMemo(() => {
    // align toolbar top if there is enough screen space,
    // otherwise align toolbar under the element
    const isToolbarVisible = rect.top - containerRect.top > TOOLBAR_HEIGHT
    const styleName = isToolbarVisible ? 'bottom' : 'top'

    return {
      alignItems: 'center',
      backgroundColor: '#43669A',
      borderRadius: isToolbarVisible ? '12px 12px 12px 0' : '0 12px 12px 12px',
      color: 'rgb(255, 255, 255)',
      display: 'flex',
      fontSize: '0.8rem',
      height: TOOLBAR_HEIGHT,
      justifyContent: 'center',
      marginLeft: '-2px',
      padding: '0.1rem 0.3rem 0.1rem 0.3rem',
      pointerEvents: 'auto',
      position: 'absolute',
      [styleName]: '100%',
    }
  }, [containerRect.top, rect.top])

  return (
    <div style={toolbarStyle}>
      <ToolbarContainer>
        {!element.isRoot && (
          <ToolbarButtonGroup>
            <DeleteButton element={element} />
            <DragButton element={element} />
            <EditTextButton runtimeElement={runtimeElement} />
          </ToolbarButtonGroup>
        )}
        <ToolbarTitle>{element.name}</ToolbarTitle>
      </ToolbarContainer>
    </div>
  )
})
