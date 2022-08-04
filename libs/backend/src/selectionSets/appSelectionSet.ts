import { storeSelectionSet } from './storeSelectionSet'

export const appSelectionSet = `{
    __typename
    domains {
        id
        name
    }
    id
    name
    slug
    rootElement {
        id
    }
    store {
        ${storeSelectionSet}
    }
}`
