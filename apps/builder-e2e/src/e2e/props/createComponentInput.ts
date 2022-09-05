import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import {
  AtomCreateInput,
  AtomType,
  ComponentCreateInput,
  PrimitiveTypeKind,
} from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/data'
import { v4 } from 'uuid'

/**
 * Create List Atom
 */
export const headerFieldName = 'Header'

export const renderItemFieldName = 'Render Item'

export const createListAtomInput = (ownerId: string): AtomCreateInput => ({
  name: 'List',
  type: AtomType.AntDesignList,
  api: {
    create: {
      node: {
        name: 'List API',
        fields: {
          create: [
            {
              node: {
                ReactNodeType: {
                  id: v4(),
                  name: ITypeKind.ReactNodeType,
                  owner: connectOwner(ownerId),
                },
              },
              edge: {
                name: headerFieldName,
                key: 'header',
              },
            },
            {
              node: {
                RenderPropsType: {
                  id: v4(),
                  name: ITypeKind.RenderPropsType,
                  owner: connectOwner(ownerId),
                },
              },
              edge: {
                name: renderItemFieldName,
                key: 'renderItem',
              },
            },
          ],
        },
        owner: connectOwner(ownerId),
      },
    },
  },
})

/**
 * create ListItem Atom
 */

export const createListItemAtomInput = (ownerId: string): AtomCreateInput => ({
  name: 'ListItem',
  type: AtomType.AntDesignListItem,
  api: {
    create: {
      node: {
        name: 'ListItem API',
        owner: connectOwner(ownerId),
      },
    },
  },
})

/**
 * create Text Atom
 */

export const createTextAtomInput = (ownerId: string): AtomCreateInput => ({
  name: 'Text',
  type: AtomType.Text,
  api: {
    create: {
      node: {
        name: 'Text API',
        fields: {
          create: [
            {
              node: {
                PrimitiveType: {
                  id: v4(),
                  name: 'String',
                  primitiveKind: PrimitiveTypeKind.String,
                  owner: connectOwner(ownerId),
                },
              },
              edge: {
                name: 'Text',
                key: 'text',
              },
            },
          ],
        },
        owner: connectOwner(ownerId),
      },
    },
  },
})

/**
 * create list item component
 * - RootElement - bind prop "value" to atom "text"'s text prop key
 *     - ListItem - Component
 *         - Text
 */
export const listItemComponentName = 'ListItem'

export const createComponentInput = (
  userId: string,
  textAtomId: string,
  listItemId: string,
): ComponentCreateInput => ({
  name: listItemComponentName,
  id: v4(),
  owner: { connect: { where: { node: { auth0Id: userId } } } },
  rootElement: {
    create: {
      node: {
        id: v4(),
        name: ROOT_ELEMENT_NAME,
        propMapBindings: {
          create: [
            {
              node: {
                sourceKey: 'value',
                targetKey: 'text',
                element: {
                  connect: { where: { node: { name: ROOT_ELEMENT_NAME } } },
                },
                targetElement: {
                  connect: { where: { node: { name: 'List Item Text' } } },
                },
              },
            },
          ],
        },
        childrenRoot: {
          create: {
            node: {
              id: v4(),
              name: 'List Item',
              atom: { connect: { where: { node: { id: listItemId } } } },
              childrenRoot: {
                create: {
                  node: {
                    id: v4(),
                    name: 'List Item Text',
                    atom: {
                      connect: { where: { node: { id: textAtomId } } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export const listElementName = 'List'
export const listDataSource = [{ value: 'test1' }, { value: 'test2' }]

export const createListElementInput = (
  listAtomId: string,
  rootElementId: string,
) => ({
  atom: { connect: { where: { node: { id: listAtomId } } } },
  name: listElementName,
  props: {
    create: { node: { data: JSON.stringify({ dataSource: listDataSource }) } },
  },
  parentElement: { connect: { where: { node: { id: rootElementId } } } },
})

export const reactNodeTextComponentName = 'Text'
export const reactNodeTextProp = { text: 'React Node' }

export const createTextReactNodeComponentInput = (
  userId: string,
  textAtomId: string,
): ComponentCreateInput => ({
  name: reactNodeTextComponentName,
  id: v4(),
  owner: { connect: { where: { node: { auth0Id: userId } } } },
  rootElement: {
    create: {
      node: {
        name: ROOT_ELEMENT_NAME,
        id: v4(),
        childrenRoot: {
          create: {
            node: {
              id: v4(),
              name: `React Node Text`,
              atom: { connect: { where: { node: { id: textAtomId } } } },
              props: {
                create: { node: { data: JSON.stringify(reactNodeTextProp) } },
              },
            },
          },
        },
      },
    },
  },
})
