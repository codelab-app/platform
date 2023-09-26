import { propSelectionSet } from './prop-selection-set'

const renderElementType = `
  renderType {
    ... on Atom {
      id
      __typename
    }
    ... on Component {
      id
      __typename
    }
}
`

const baseElementSelectionSet = `
  id
  name
  slug
  compositeKey
  style
  parentComponent {
    id
    name
  }
  ${renderElementType}
  parent {
    id
  }
  prevSibling {
    id
  }
  nextSibling {
    id
  }
  firstChild {
    id
  }
  childMapperPreviousSibling {
    id
  }
  props
    ${propSelectionSet}
  renderForEachPropKey
  childMapperPropKey
  childMapperComponent {
    id
    name
  }
  renderIfExpression
  preRenderAction {
    id
    type
  }
  postRenderAction {
    id
    type
  }
`

export const elementSelectionSet = `{
  ${baseElementSelectionSet}
  ${renderElementType}
}`

// ${atomSelectionSet}

export const exportElementSelectionSet = `{
  ${baseElementSelectionSet}
  ${renderElementType}
}`
