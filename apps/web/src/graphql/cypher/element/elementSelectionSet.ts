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
        api {
            id
            name
        }
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
