import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'
import { Layout } from '@codelab/generated'

interface BuilderPaneControllerProps {
  layout: Layout
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
  visibility: ${({ visible }: { visible: boolean }) =>
    visible ? 'visible' : 'hidden'};
`

export const BuilderPaneController = ({
  layout,
  children,
  isRendered = () => true,
  isVisible = () => true,
}: PropsWithChildren<BuilderPaneControllerProps>) => {
  return (
    <>
      {isRendered(layout) ? (
        <PaneStyle visible={isVisible(layout)}>{children}</PaneStyle>
      ) : null}{' '}
    </>
  )
}
