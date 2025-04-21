import type { IElementDto } from '@codelab/shared/abstract/core'
import type { ElementFragment } from '@codelab/shared/infra/gqlgen'

/**
 * Sorts an array of page elements in a pre-order traversal sequence that preserves parent-child and sibling relationships.
 * This sorting is crucial for export/import operations where elements need to be processed in an order that maintains
 * referential integrity (ensuring referenced elements are processed before elements that reference them).
 *
 * The function handles elements with the following relationships:
 * - Parent-Child: via firstChild (parent -> child) and parentElement (child -> parent)
 * - Sibling Chain: via nextSibling (current -> next) and prevSibling (next -> current)
 *
 * Algorithm:
 * 1. Creates a map of elements by ID for O(1) lookups
 * 2. Identifies root element (element with no parent and no previous sibling)
 * 3. Performs depth-first traversal where at each node:
 *    - Current element is added to result
 *    - Processes all children (and their subtrees) from left to right
 *    - Children are processed by following firstChild -> nextSibling chain
 *
 * The resulting order ensures:
 * - Parent elements appear before their children
 * - Previous siblings appear before next siblings
 * - All elements in a subtree appear before moving to next sibling's subtree
 *
 * @param elements - Array of elements representing a page's element tree
 * @returns Sorted array where elements can be processed sequentially while maintaining references
 * @throws Error if no root element is found in the array
 *
 * @example
 * // Given a tree structure:
 * //      Root
 * //     /    \
 * //   Child1  Child2
 * //   /
 * // GrandChild
 *
 * // Returns elements in order: [Root, Child1, GrandChild, Child2]
 */
export const sortElementsForExport = <T extends ElementFragment | IElementDto>(
  elements: Array<T>,
): Array<T> => {
  const elementMap = new Map(elements.map((el) => [el.id, el]))
  const root = elements.find((el) => !el.parentElement && !el.prevSibling)
  const sorted: Array<T> = []

  if (!root) {
    throw new Error('No root element found')
  }

  const processElement = (element: T) => {
    sorted.push(element)

    let currentChild =
      element.firstChild && elementMap.get(element.firstChild.id)

    while (currentChild) {
      processElement(currentChild)
      currentChild =
        currentChild.nextSibling && elementMap.get(currentChild.nextSibling.id)
    }
  }

  processElement(root)

  return sorted
}
