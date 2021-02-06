import styled from '@emotion/styled'
import React, { PropsWithChildren, useContext } from 'react'
import { LayoutContext } from '../layout/LayoutProvider'
import { Layout } from '@codelab/generated'

interface BuilderPaneControllerProps {
  // layout: LayoutFragmentsFragment
  /**
   * Predicated to determine whether component should be rendered
   */
  isRendered?: (layout: Layout) => boolean
  /**
   * Predicated to determine whether component should be visible
   */
  isVisible?: (layout: Layout) => boolean
}

export const PaneStyle = styled.div`
  display: ${({ visible }: { visible: boolean }) =>
    visible ? 'block' : 'none'};
`

export const BuilderPaneController = ({
  children,
  isRendered = () => true,
  isVisible = () => true,
}: PropsWithChildren<BuilderPaneControllerProps>) => {
  const layout = useContext(LayoutContext)

  return (
    <>
      {isRendered(layout) ? (
        <PaneStyle visible={isVisible(layout)}>{children}</PaneStyle>
      ) : null}
    </>
  )
}
