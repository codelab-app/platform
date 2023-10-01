import styled from 'styled-components'

export const SpacingValue = styled.div<{ $backgroundColor: string }>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: white;
  padding: 2px;
  font-size: 9px;
  border-radius: 2px;
`

export const Spacing = styled.div<SpacingProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $height: height }) => height};
  width: ${({ $width: width }) => width};
  left: ${({ $left: left }) => left};
  right: ${({ $right: right }) => right};
  top: ${({ $top: top }) => top};
  bottom: ${({ $bottom: bottom }) => bottom};
  overflow: hidden;
`

export interface SpacingProps extends ISpacingValues {
  $height: string
  $width: string
}

export interface ISpacingValues {
  $bottom: string
  $left: string
  $right: string
  $top: string
}

// if it's less than 18px, we prefer not to display the value to avoid truncation
export const MIN_DISPLAYABLE_VALUE = 18
