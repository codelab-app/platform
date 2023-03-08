import { atomSelectionSet } from './atomSelectionSet'
import { componentSelectionSet } from './componentSelectionSet'

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
