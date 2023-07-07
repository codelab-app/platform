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
  props
    ${propSelectionSet}
  renderForEachPropKey
  childMapperPropKey
  childMapperComponent {
    id
    name
  }
  renderIfExpression
  propTransformationJs
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
