const componentSelectionSet = `{
  id
  name
  rootElement {
    id
    name
  }
  owner {
    id
    auth0Id
  }
}`

export const elementSelectionSet = `{
    id
    name
    css
    component {
        ${componentSelectionSet}
    }
    instanceOfComponent {
        ${componentSelectionSet}
    }
    parentElement {
        id
        name
    }
    atom {
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
    parentElementConnection {
        edges {
            node {
                id
                name
            }
            order
        }
    }
}`
