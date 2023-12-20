import { atomSelectionSet } from './atom-selection-set'
import { propSelectionSet } from './prop-selection-set'

const renderElementType = `
  renderType {
    ... on Atom {
      ${atomSelectionSet}
    }
    ... on Component {
      id
      __typename
      api {
        id
      }
    }
}
`

const baseElementSelectionSet = `
  id
  name
  slug
  compositeKey
  style
  tailwindClassNames
  parentComponent {
    id
    name
  }
  parentElement {
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
  props {
    ${propSelectionSet}
  }
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

export const elementSelectionSet = `
  ${baseElementSelectionSet}
  ${renderElementType}
`

export const exportElementSelectionSet = `
  ${baseElementSelectionSet}
  ${renderElementType}
`
