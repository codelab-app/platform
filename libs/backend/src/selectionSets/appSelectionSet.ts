import { storeSelectionSet } from './storeSelectionSet'

export const appSelectionSet = `{ 
    __typename
    id
    name
    rootElement {
        id 
    }
    store {
        ${storeSelectionSet}
    }  
}`
