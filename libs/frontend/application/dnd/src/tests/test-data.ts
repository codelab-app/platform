export interface Hierarchy {
  [key: number | string]: {
    children?: Hierarchy
    parentId?: number | string
    style?: React.CSSProperties
    descriptor?: string
    tobe?: 'both' | 'draggable' | 'droppable'
  }
}

const populateParentId = (hierarchy: Hierarchy): Hierarchy => {
  const recursivelyPopulateParentId = (
    subTree: Hierarchy,
    parentId: number | string,
    entireHierarchy: Hierarchy,
  ) => {
    const keys = Object.keys(subTree)

    keys.forEach((key) => {
      const node = subTree[key]

      if (!node) {
        return
      }

      const { children } = node

      if (children) {
        recursivelyPopulateParentId(children, key, entireHierarchy)
      }

      node.parentId = parentId
    })
  }

  recursivelyPopulateParentId(hierarchy, '', hierarchy)

  return hierarchy
}

export const simpleTree: Hierarchy = populateParentId({
  root: {
    children: {
      '1-parent': {
        children: {
          'first-child': {
            style: {
              height: 250,
              left: 0,
              top: 0,
              width: 200,
            },
            tobe: 'droppable',
          },
          'second-child': {
            style: {
              height: 250,
              left: 0,
              top: 250,
              width: 200,
            },
            tobe: 'droppable',
          },
        },
        style: {
          height: 500,
          left: 0,
          top: 0,
          width: 200,
        },
        tobe: 'droppable',
      },
      '2-draggable': {
        style: {
          height: 500,
          left: 200,
          top: 0,
          width: 200,
        },
        tobe: 'draggable',
      },
    },
    style: {
      height: 500,
      left: 0,
      top: 0,
      width: 400,
    },
    tobe: 'droppable',
  },
})

export const horizontalSimpleTree: Hierarchy = {
  ...simpleTree,
  root: {
    ...simpleTree.root,
    children: {
      ...simpleTree.root?.children,
      '1-parent': {
        ...simpleTree.root?.children?.['1-parent'],
        children: {
          ...simpleTree.root?.children?.['1-parent']?.children,
          'first-child': {
            ...simpleTree.root?.children?.['1-parent']?.children?.[
              'first-child'
            ],
            style: {
              height: 500,
              left: 0,
              top: 0,
              width: 100,
            },
          },
          'second-child': {
            ...simpleTree.root?.children?.['1-parent']?.children?.[
              'second-child'
            ],
            style: {
              height: 500,
              left: 100,
              top: 0,
              width: 100,
            },
          },
        },
      },
    },
  },
}

export const nonDraggableSimpleTree: Hierarchy = {
  ...simpleTree,
  root: {
    ...simpleTree.root,
    children: {
      ...simpleTree.root?.children,
      '2-draggable': {
        tobe: undefined,
      },
    },
  },
}

export const nonDroppableSimpleTree: Hierarchy = {
  ...simpleTree,
  root: {
    ...simpleTree.root,
    children: {
      ...simpleTree.root?.children,
      '1-parent': {
        ...simpleTree.root?.children?.['1-parent'],
        children: {
          ...simpleTree.root?.children?.['1-parent']?.children,
          'first-child': {
            ...simpleTree.root?.children?.['1-parent']?.children?.[
              'first-child'
            ],
            tobe: undefined,
          },
          'second-child': {
            ...simpleTree.root?.children?.['1-parent']?.children?.[
              'second-child'
            ],
            tobe: undefined,
          },
        },
        tobe: undefined,
      },
    },
    tobe: undefined,
  },
}
