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
  renderIfExpression
  propTransformationJs
  preRenderAction {
    id
  }
  postRenderAction {
    id
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
