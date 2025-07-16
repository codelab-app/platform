import type { IFieldDto } from '@codelab/shared-abstract-core'

/**
 * Sorts fields by their sibling relationships (prevSibling/nextSibling) using functional recursion.
 *
 * Algorithm:
 * 1. Build a lookup map for O(1) field access by id
 * 2. Identify starting fields (those without prevSibling)
 * 3. For each starting field, recursively traverse the linked list via nextSibling
 * 4. Use array spreading to build chains without mutation
 * 5. flatMap combines all chains into the final ordered array
 *
 * Example traversal for A→B→C chain:
 * - collectLinkedList(A) calls traverse(A)
 * - traverse(A) returns [A, ...traverse(B)]
 * - traverse(B) returns [B, ...traverse(C)]
 * - traverse(C) returns [C] (base case)
 * - Final: [A, B, C] through recursive array spreading
 *
 * @template T - Type that extends IFieldDto
 * @param fields - Array of fields with sibling relationships
 * @returns Fields in correct sibling order, maintaining chain integrity
 */
export const sortFieldsForExport = <T extends IFieldDto>(
  fields: Array<T>,
): Array<T> => {
  // Build lookup map for O(1) field access by id
  const fieldsMap = new Map(fields.map((field) => [field.id, field]))

  /**
   * Builds a single linked list chain starting from a given field.
   * Uses recursion with array spreading to avoid mutation.
   */
  const collectLinkedList = (startField: T): Array<T> => {
    /**
     * Recursively traverses the sibling chain using nextSibling references.
     * Each call returns an array segment that gets spread into the parent array.
     */
    const traverse = (field: T): Array<T> => [
      field,
      ...(field.nextSibling && fieldsMap.has(field.nextSibling.id)
        ? traverse(fieldsMap.get(field.nextSibling.id)!)
        : []),
    ]

    return traverse(startField)
  }

  // Get all starting fields (no prevSibling), then build and flatten all chains
  return fields.filter((field) => !field.prevSibling).flatMap(collectLinkedList)
}
