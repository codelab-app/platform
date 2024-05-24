import type {
  Active,
  DroppableContainer,
  UniqueIdentifier,
} from '@dnd-kit/core'
import get from 'lodash/get'
import { type Point, type Rect, Rectangle } from '../geometry'
import type { WithInternalDropData } from '../hooks/internal-drop-data.interface'
import { HierarchicalCollisionDetector } from './hierarchical-collision-detector'

interface BaseHierarchyItem {
  id: UniqueIdentifier
  parentId?: UniqueIdentifier
  rect: Rect | null
}

const convertToDroppableContainer = (
  item: BaseHierarchyItem,
): DroppableContainer => ({
  data: {
    current: {
      internalUseOnlyDropData: {
        hierarchy: {
          parentId: item.parentId,
        },
      },
    },
  } as WithInternalDropData<undefined>,
  disabled: false,

  id: item.id,
  key: item.id,
  node: { current: null },
  rect: { current: item.rect },
})

interface Hierarchy {
  [key: UniqueIdentifier]: {
    children?: Hierarchy
    rect: Rect
  }
}

const createDroppableContainers = (
  hierarchy: Hierarchy,
): Array<DroppableContainer> => {
  const containers: Array<DroppableContainer> = []

  const recursivelyAddContainers = (
    subtree: Hierarchy,
    parentId?: UniqueIdentifier,
  ) => {
    Object.keys(subtree).forEach((id) => {
      const item = subtree[id]

      if (!item) {
        return
      }

      containers.push(
        convertToDroppableContainer({
          id,
          parentId,
          rect: item.rect,
        }),
      )

      if (item.children) {
        recursivelyAddContainers(item.children, id)
      }
    })
  }

  recursivelyAddContainers(hierarchy)

  return containers
}

const createActiveNode = (hierarchy: Hierarchy, path: string): Active => {
  const formattedPath = path
    .split('.')
    .map((item, index) => (index > 0 ? `children.${item}` : item))
    .join('.')

  return {
    data: { current: undefined },
    id: path.split('.').pop() || '',
    rect: {
      current: {
        initial: get(hierarchy, formattedPath).rect,
        translated: get(hierarchy, formattedPath).rect,
      },
    },
  }
}

const createPoint = (xValue: number, yValue: number): Point => ({
  x: xValue,
  y: yValue,
})

describe('HierarchicalCollisionDetector', () => {
  const spacing = 10
  let detector: HierarchicalCollisionDetector

  beforeEach(() => {
    detector = new HierarchicalCollisionDetector({
      spacing,
    })
  })

  describe('detectCollisions method basic functionality', () => {
    it('should return an empty array when pointerCoordinates are null', () => {
      const tree: Hierarchy = {
        1: {
          rect: Rectangle.createRect(0, 0, 100, 100),
        },
        2: {
          rect: Rectangle.createRect(100, 100, 100, 100),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '1'),
        droppableContainers: createDroppableContainers(tree),
        pointerCoordinates: null,
      })

      expect(result).toEqual([])
    })

    it('should return an empty array when droppableContainers is empty', () => {
      const tree: Hierarchy = {
        1: {
          rect: Rectangle.createRect(0, 0, 100, 100),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '1'),
        droppableContainers: [],
        pointerCoordinates: createPoint(50, 50),
      })

      expect(result).toEqual([])
    })
  })

  describe('Simple collision detection in detectCollisions', () => {
    const tree: Hierarchy = {
      1: {
        rect: Rectangle.createRect(0, 0, 100, 100),
      },
      2: {
        rect: Rectangle.createRect(10, 10, 100, 100),
      },
    }

    const droppableContainers = createDroppableContainers(tree)
    const active = createActiveNode(tree, '1')

    it('should detect a simple collision when the pointer is inside the target element', () => {
      const result = detector.detectCollisions({
        active,
        droppableContainers,
        pointerCoordinates: createPoint(50, 50),
      })

      expect(result).toEqual([{ data: {}, id: '2' }])
    })

    it('should not detect any collision when the pointer is outside the droppable container', () => {
      const result = detector.detectCollisions({
        active,
        droppableContainers,
        pointerCoordinates: createPoint(200, 200),
      })

      expect(result).toEqual([])
    })
  })

  describe('Complex collision scenarios', () => {
    it('should detect collision with the farthest child from root when multiple containers intersect the pointer', () => {
      const tree: Hierarchy = {
        1: {
          children: {
            2: {
              children: {
                3: {
                  rect: Rectangle.createRect(20, 20, 60, 60),
                },
              },
              rect: Rectangle.createRect(10, 10, 80, 80),
            },
            4: {
              rect: Rectangle.createRect(90, 10, 20, 20),
            },
          },
          rect: Rectangle.createRect(0, 0, 120, 120),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '1.4'),
        droppableContainers: createDroppableContainers(tree),
        pointerCoordinates: createPoint(30, 30),
      })

      expect(result).toEqual([{ data: {}, id: '3' }])
    })

    it('should detect collision with the parent element when a droppable is dragged over itself', () => {
      const tree: Hierarchy = {
        1: {
          children: {
            2: {
              rect: Rectangle.createRect(20, 20, 80, 80),
            },
          },
          rect: Rectangle.createRect(10, 10, 100, 100),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '1.2'),
        droppableContainers: createDroppableContainers(tree),
        pointerCoordinates: createPoint(30, 30),
      })

      expect(result.map((res) => res.id)).toEqual(['1'])
    })

    it('should detect collision with the parent element when a droppable is dragged over its children', () => {
      const tree: Hierarchy = {
        1: {
          children: {
            2: {
              children: {
                3: {
                  rect: Rectangle.createRect(30, 30, 70, 70),
                },
              },
              rect: Rectangle.createRect(20, 20, 80, 80),
            },
          },
          rect: Rectangle.createRect(10, 10, 100, 100),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '1.2'),
        droppableContainers: createDroppableContainers(tree),
        pointerCoordinates: createPoint(55, 55),
      })

      expect(result.map((res) => res.id)).toEqual(['1'])
    })
  })

  describe('Container size adjustments based on hierarchy', () => {
    it('should not shrink the root container', () => {
      const tree: Hierarchy = {
        1: {
          rect: Rectangle.createRect(0, 0, 100, 100),
        },
        2: {
          rect: Rectangle.createRect(100, 100, 20, 20),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '2'),
        droppableContainers: createDroppableContainers(tree),
        pointerCoordinates: createPoint(0, 0),
      })

      expect(result.map((collison) => collison.id)).toEqual(['1'])
    })

    it('should detect collision with parent when child is the same size of the parent', () => {
      const ahierarchy: Hierarchy = {
        1: {
          children: {
            2: {
              children: {
                3: {
                  rect: Rectangle.createRect(0, 0, 100, 100),
                },
              },
              rect: Rectangle.createRect(0, 0, 100, 100),
            },
            4: {
              rect: Rectangle.createRect(100, 100, 100, 100),
            },
          },
          rect: Rectangle.createRect(0, 0, 200, 200),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(ahierarchy, '1.4'),
        droppableContainers: createDroppableContainers(ahierarchy),
        pointerCoordinates: createPoint(2 * spacing - 3, 2 * spacing - 3),
      })

      expect(result.map((collision) => collision.id)).toEqual(['2'])
    })

    it('should detect collision with parent between two closely packed children', () => {
      const childrenIntersectionX = 100

      const tree: Hierarchy = {
        1: {
          children: {
            2: {
              rect: Rectangle.createRect(0, 0, childrenIntersectionX, 100),
            },
            3: {
              rect: Rectangle.createRect(childrenIntersectionX, 0, 100, 100),
            },
          },
          rect: Rectangle.createRect(0, 0, 200, 200),
        },
        4: {
          rect: Rectangle.createRect(0, 200, 200, 200),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '4'),
        droppableContainers: createDroppableContainers(tree),
        pointerCoordinates: createPoint(childrenIntersectionX, 15),
      })

      expect(result.map((colision) => colision.id)).toEqual(['1'])
    })

    it('should detect collision with parent when child is at the corner of the parent', () => {
      const parentCenter = 50

      const tree: Hierarchy = {
        1: {
          children: {
            2: {
              children: {
                3: {
                  rect: Rectangle.createRect(
                    parentCenter,
                    parentCenter,
                    50,
                    50,
                  ),
                },
              },
              rect: Rectangle.createRect(
                0,
                0,
                parentCenter + 50,
                parentCenter + 50,
              ),
            },
          },
          rect: Rectangle.createRect(0, 0, 200, 200),
        },
        4: {
          rect: Rectangle.createRect(0, 200, 200, 200),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '4'),
        droppableContainers: createDroppableContainers(tree),
        pointerCoordinates: createPoint(
          parentCenter + 50 - 2 * spacing + 1,
          parentCenter + 50 - 2 * spacing + 1,
        ),
      })

      expect(result.map((collision) => collision.id)).toEqual(['2'])
    })
  })

  describe('Complex sibling identification in hierarchical structures', () => {
    it('should correctly identify no siblings when the droppable container has no children', () => {
      const tree: Hierarchy = {
        1: {
          rect: Rectangle.createRect(0, 0, 100, 100),
        },
        2: {
          rect: Rectangle.createRect(100, 100, 100, 100),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '2'),
        droppableContainers: createDroppableContainers(tree),
        pointerCoordinates: createPoint(50, 50),
      })

      expect(result[0]?.data.childDroppableAfterPointer).toEqual(undefined)
      expect(result[0]?.data.childDroppableBeforePointer).toEqual(undefined)
    })

    it("should correctly identify 'before' placement when the pointer is to the bottom or the right of a single child", () => {
      const tree: Hierarchy = {
        1: {
          children: {
            2: {
              rect: Rectangle.createRect(20, 20, 40, 40),
            },
          },
          rect: Rectangle.createRect(0, 0, 100, 100),
        },
        3: {
          rect: Rectangle.createRect(50, 50, 70, 70),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '3'),
        droppableContainers: createDroppableContainers(tree),
        // Point to the bottom-right of the child
        pointerCoordinates: createPoint(65, 65),
      })

      expect(result[0]?.data.childDroppableBeforePointer).toEqual('2')
      expect(result[0]?.data.childDroppableAfterPointer).toEqual(undefined)
    })

    it("should correctly identify 'after' placement when the pointer is to the top or left of a single child", () => {
      const tree: Hierarchy = {
        1: {
          children: {
            2: {
              rect: Rectangle.createRect(20, 20, 40, 40),
            },
          },
          rect: Rectangle.createRect(0, 0, 100, 100),
        },
        3: {
          rect: Rectangle.createRect(50, 50, 70, 70),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '3'),
        droppableContainers: createDroppableContainers(tree),
        // Point to the top-left of the child
        pointerCoordinates: createPoint(15, 15),
      })

      expect(result[0]?.data.childDroppableAfterPointer).toEqual('2')
      expect(result[0]?.data.childDroppableBeforePointer).toEqual(undefined)
    })

    it("should correctly identify 'after' placement when the pointer is to the left or top of the first child in a group of three children", () => {
      const tree: Hierarchy = {
        1: {
          children: {
            2: {
              rect: Rectangle.createRect(10, 10, 80, 20),
            },
            3: {
              rect: Rectangle.createRect(10, 30, 80, 20),
            },
            4: {
              rect: Rectangle.createRect(10, 50, 80, 20),
            },
          },
          rect: Rectangle.createRect(0, 0, 100, 100),
        },
        5: {
          rect: Rectangle.createRect(50, 50, 70, 70),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '5'),
        droppableContainers: createDroppableContainers(tree),
        // Point to the left/top of the first child
        pointerCoordinates: createPoint(5, 5),
      })

      expect(result[0]?.data.childDroppableAfterPointer).toEqual('2')
      expect(result[0]?.data.childDroppableBeforePointer).toEqual(undefined)
    })

    it("should correctly identify 'before' placement when the pointer is to the right or bottom of the last child in a group of three children", () => {
      const tree: Hierarchy = {
        1: {
          children: {
            2: {
              rect: Rectangle.createRect(10, 10, 80, 20),
            },
            3: {
              rect: Rectangle.createRect(10, 30, 80, 20),
            },
            4: {
              rect: Rectangle.createRect(10, 50, 80, 20),
            },
          },
          rect: Rectangle.createRect(0, 0, 100, 100),
        },
        5: {
          rect: Rectangle.createRect(50, 50, 70, 70),
        },
      }

      const result = detector.detectCollisions({
        active: createActiveNode(tree, '5'),
        droppableContainers: createDroppableContainers(tree),
        // Point to the right/bottom of the last child
        pointerCoordinates: createPoint(85, 85),
      })

      expect(result[0]?.data.childDroppableBeforePointer).toEqual('4')
      expect(result[0]?.data.childDroppableAfterPointer).toEqual(undefined)
    })

    it("should correctly identify 'before' and 'after' to be the first and second children when the pointer is between these two children in a group of three", () => {
      const tree: Hierarchy = {
        1: {
          children: {
            2: {
              rect: Rectangle.createRect(10, 10, 80, 20),
            },
            3: {
              rect: Rectangle.createRect(10, 30, 80, 20),
            },
            4: {
              rect: Rectangle.createRect(10, 50, 80, 20),
            },
          },
          rect: Rectangle.createRect(0, 0, 100, 100),
        },
        5: {
          rect: Rectangle.createRect(50, 50, 70, 70),
        },
      }

      const result1 = detector.detectCollisions({
        active: createActiveNode(tree, '5'),
        droppableContainers: createDroppableContainers(tree),
        // Point between the first and second children (closer to the first)
        pointerCoordinates: createPoint(50, 28),
      })

      expect(result1[0]?.data.childDroppableBeforePointer).toEqual('2')
      expect(result1[0]?.data.childDroppableAfterPointer).toEqual(undefined)

      const result2 = detector.detectCollisions({
        active: createActiveNode(tree, '5'),
        droppableContainers: createDroppableContainers(tree),
        // Point between the first and second children (closer to the second)
        pointerCoordinates: createPoint(50, 32),
      })

      expect(result2[0]?.data.childDroppableBeforePointer).toEqual(undefined)
      expect(result2[0]?.data.childDroppableAfterPointer).toEqual('3')
    })
  })
})
