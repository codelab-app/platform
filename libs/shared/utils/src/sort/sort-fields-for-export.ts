import type { IFieldDto } from '@codelab/shared-abstract-core'

/**
 * Sorts an array of fields based on their sibling relationships (prevSibling and nextSibling).
 * The function creates a linked list-like structure where fields are connected through their
 * prevSibling and nextSibling properties, and returns them in the correct order.
 *
 * @template T - Type that extends IFieldDto
 * @param fields - Array of fields to be sorted
 * @returns Array of fields sorted according to their sibling relationships
 */
export const sortFieldsForExport = <T extends IFieldDto>(
  fields: Array<T>,
): Array<T> => {
  const fieldsMap = new Map(fields.map((field) => [field.id, field]))
  const firstFields = fields.filter((field) => !field.prevSibling)
  const sortedFields: Array<T> = []

  for (const firstField of firstFields) {
    let nextField: T | undefined = firstField

    while (nextField) {
      sortedFields.push(nextField)
      nextField = nextField.nextSibling
        ? fieldsMap.get(nextField.nextSibling.id)
        : undefined
    }
  }

  return sortedFields
}
