import styled from 'styled-components'

import type { ISpacingValues, SpacingProps } from './shared'

import { MIN_DISPLAYABLE_VALUE, Spacing, SpacingValue } from './shared'

export const Margins = ({ values }: { values: ISpacingValues }) => {
  return (
    <>
      {/* Margin Top */}
      <Margin
        $bottom="auto"
        $height={values.$top}
        $left="0px"
        $right="0px"
        $top={`-${values.$top}`}
        $width="auto"
        value={values.$top}
      />
      {/* Margin Bottom */}
      <Margin
        $bottom={`-${values.$bottom}`}
        $height={values.$bottom}
        $left="0"
        $right="0"
        $top="auto"
        $width="auto"
        value={values.$bottom}
      />
      {/* Margin Left */}
      <Margin
        $bottom={`-${values.$bottom}`}
        $height="auto"
        $left={`-${values.$left}`}
        $right="0"
        $top={`-${values.$top}`}
        $width={values.$left}
        value={values.$left}
      />
      {/* Margin Right */}
      <Margin
        $bottom={`-${values.$bottom}`}
        $height="auto"
        $left="auto"
        $right={`-${values.$right}`}
        $top={`-${values.$top}`}
        $width={values.$right}
        value={values.$right}
      />
    </>
  )
}

const marginBackgroundPattern = () => `
  background-color: #e5e5f7;
  opacity: 0.8;
  background-size: 4px 4px;
  background-image: repeating-linear-gradient(45deg, #e58911 0,
    #e58911 1px,
    #e5e5f7 0,
    #e5e5f7 50%);
`

const MarginBox = styled(Spacing)`
  ${marginBackgroundPattern()};
`

const Margin = ({ value, ...rest }: SpacingProps & { value: string }) => {
  const numberValue = Math.round(Number(value.replace('px', '')))

  if (!numberValue) {
    return null
  }

  return (
    <MarginBox {...rest}>
      {numberValue > MIN_DISPLAYABLE_VALUE && (
        <SpacingValue $backgroundColor="#d75300">{`${numberValue}px`}</SpacingValue>
      )}
    </MarginBox>
  )
}
