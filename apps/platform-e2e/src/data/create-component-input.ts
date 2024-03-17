import { connectNodeId } from '@codelab/shared/domain'

/**
 * Create List Atom
 */
export const headerFieldName = 'Header'

export const renderItemFieldName = 'Render Item'

/**
 * create list item component
 * - RootElement - bind prop "value" to atom "text"'s text prop key
 *     - ListItem - Component
 *         - Text
 */
export const listItemComponentName = 'ListItem'

export const listElementName = 'List'

export const listDataSource = [{ value: 'test1' }, { value: 'test2' }]

export const reactNodeTextComponentName = 'Text'

export const reactNodeTextProp = { text: 'React Node' }
