import styled from 'styled-components'

import type { ISpacingValues, SpacingProps } from './spacing'

import { MIN_DISPLAYABLE_VALUE, Spacing, SpacingValue } from './spacing'

export const Paddings = ({ values }: { values: ISpacingValues }) => {
  return (
    <>
      {/* Padding Top */}
      <Padding
        $bottom="auto"
        $height={values.$top}
        $left="1px"
        $right="1px"
        $top="1px"
        $width="auto"
        value={values.$top}
      />
      {/* Padding Bottom */}
      <Padding
        $bottom="1px"
        $height={values.$bottom}
        $left="1px"
        $right="1px"
        $top="auto"
        $width="auto"
        value={values.$bottom}
      />
      {/* Padding Left */}
      <Padding
        $bottom={values.$bottom}
        $height="auto"
        $left="1px"
        $right="auto"
        $top={values.$top}
        $width={values.$left}
        value={values.$left}
      />
      {/* Padding Right */}
      <Padding
        $bottom={values.$bottom}
        $height="auto"
        $left="auto"
        $right="1px"
        $top={values.$top}
        $width={values.$right}
        value={values.$right}
      />
    </>
  )
}

const paddingBackgroundPattern = () => `
  background-color: #e5e5f7;
  opacity: 0.8;
  background-size: 4px 4px;
  background-image: repeating-linear-gradient(45deg, #069165 0,
    #22e9aa 1px,
    #e5e5f7 0,
    #e5e5f7 50%);
`

const PaddingBox = styled(Spacing)`
  ${paddingBackgroundPattern()};
`

const Padding = ({ value, ...rest }: SpacingProps & { value: string }) => {
  const numberValue = Math.round(Number(value.replace('px', '')))

  if (!numberValue) {
    return null
  }

  return (
    <PaddingBox {...rest}>
      {numberValue > MIN_DISPLAYABLE_VALUE && (
        <SpacingValue $backgroundColor="#0a9166">{`${numberValue}px`}</SpacingValue>
      )}
    </PaddingBox>
  )
}
