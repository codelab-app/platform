import { propSelectionSet } from './prop-selection-set'

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
  renderComponentType {
    id
    name
  }
  renderType {
    id
    kind
  }
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
  renderAtomType {
    id
  }
}`

// ${atomSelectionSet}

export const exportElementSelectionSet = `{
  ${baseElementSelectionSet}
  renderAtomType {
    id
    name
  }
}`
