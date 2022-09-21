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
  renderAtomType {
    id
    name
    type
    api {
      id
      name
    }
    tags {
      id
      name
    }
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
  hooks {
    id
    type
    config {
      id
      data
    }
    element {
      id
      name
    }
  }
  renderForEachPropKey
  renderIfPropKey
  propMapBindings {
    id
    sourceKey
    targetKey
    element {
      id
      name
    }
    targetElement {
      id
      name
    }
  }
  propTransformationJs
  preRenderActionId
  postRenderActionId
}`
