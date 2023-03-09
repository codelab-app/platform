import { atomSelectionSet } from './atomSelectionSet'
import { componentSelectionSet } from './componentSelectionSet'

/**
 * `__typename` needed for renderType to resolve
 */
export const elementSelectionSet = `{
  id
  name
  customCss
  guiCss
  parentComponent
    ${componentSelectionSet}
  renderComponentType
    ${componentSelectionSet}
  renderAtomType
    ${atomSelectionSet}
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
  props {
    id
    data
  }
  renderForEachPropKey
  renderIfExpression
  propTransformationJs
  preRenderAction {
    id
  }
  postRenderAction {
    id
  }
}`
