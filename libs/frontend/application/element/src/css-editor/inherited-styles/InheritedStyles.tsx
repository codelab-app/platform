import type {
  ElementCssRules,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import { Card, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'

interface InheritedStylesProps {
  element: IElementModel
}

interface RuleState {
  level: number
  overridden: boolean
  style: string
}

const StyledCard = styled(Card)`
  background-color: #fafafa;
  margin-bottom: 0.5rem;

  .ant-card-body {
    padding: 0.5rem 1rem;
  }
`

const getRules = (
  currentStyles: ElementCssRules | undefined,
  inheritedStyles: ElementCssRules,
  level = 0,
): Array<RuleState> => {
  const rootRules = []
  const nestedRules = []

  for (const [key, value] of Object.entries(inheritedStyles)) {
    const overridden = Boolean(currentStyles?.[key])

    if (typeof value === 'string') {
      rootRules.push({ level, overridden, style: `${key}: ${value};` })
    } else if (typeof currentStyles?.[key] !== 'string') {
      nestedRules.push({ level, overridden: false, style: `${key} {` })
      nestedRules.push(
        ...getRules(currentStyles?.[key] as ElementCssRules, value, level + 1),
      )
      nestedRules.push({ level, overridden: false, style: `}\n` })
    }
  }

  return [...rootRules, ...nestedRules]
}

export const InheritedStyles = observer(({ element }: InheritedStylesProps) => {
  const { currentStyles, inheritedStyles } =
    element.stylesInheritedFromOtherBreakpoints

  const rootProps = getRules(currentStyles, inheritedStyles).map(
    ({ level, overridden, style }) => (
      <Typography.Text
        delete={overridden}
        disabled={overridden}
        style={{ display: 'block', marginLeft: `${level}rem` }}
      >
        {style}
      </Typography.Text>
    ),
  )

  return (
    <StyledCard>
      {rootProps.length > 0 ? (
        rootProps
      ) : (
        <Typography.Text type="secondary">No inherited styles</Typography.Text>
      )}
    </StyledCard>
  )
})
