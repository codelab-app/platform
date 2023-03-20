import { atomSelectionSet } from './atomSelectionSet'
import { componentSelectionSet } from './componentSelectionSet'
import { propSelectionSet } from './propSelectionSet'

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
}`
