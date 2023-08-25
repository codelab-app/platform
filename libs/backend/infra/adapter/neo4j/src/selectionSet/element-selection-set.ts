import { atomSelectionSet } from './atom-selection-set'
import { propSelectionSet } from './prop-selection-set'

const baseElementSelectionSet = `
  id
  name
  customCss
  guiCss
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
  _compoundRefKey
  refKey
`

export const elementSelectionSet = `{
  ${baseElementSelectionSet}
  renderAtomType
    ${atomSelectionSet}
}`

export const exportElementSelectionSet = `{
  ${baseElementSelectionSet}
  renderAtomType {
    id
    name
  }
}`
