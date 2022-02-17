export const elementSelectionSet = `{
    id
    name
    css
    instanceOfComponent {
        id
    }
    parentElement {
        id
        name
    }
    atom {
        id
        name
        type
    }
    componentTag {
        id
        name
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
    }
    renderForEachPropKey
    renderIfPropKey
        propMapBindings {
        id
        sourceKey
        targetKey
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
