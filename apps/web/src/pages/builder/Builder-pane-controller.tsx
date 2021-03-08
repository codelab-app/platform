import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'
import { useRecoilState } from 'recoil'
import { LayoutStateType, layoutState } from '../../templates/layout-state'

interface BuilderPaneControllerProps {
  /**
   * Predicated to determine whether component should be rendered
   */
  isRendered?: (layout: LayoutStateType) => boolean
  /**
   * Predicated to determine whether component should be visible
   */
  isVisible?: (layout: LayoutStateType) => boolean
}

export const PaneStyle = styled.div`
  display: ${({ visible }: { visible: boolean }) =>
    visible ? 'block' : 'none'};
  height: 100%;
`

export const BuilderPaneController = ({
  children,
  isRendered = () => true,
  isVisible = () => true,
}: PropsWithChildren<BuilderPaneControllerProps>) => {
  const [layout] = useRecoilState(layoutState)

  return (
    <>
      {isRendered(layout) ? (
        <PaneStyle visible={isVisible(layout)}>{children}</PaneStyle>
      ) : null}
    </>
  )
}
