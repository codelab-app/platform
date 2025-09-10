'use client'

import type { IMoveElementSchemaBuilder } from '@codelab/frontend-abstract-domain'

import { selectFieldSchema } from '@codelab/frontend-presentation-components-form/schema'

export const moveElementSchema: IMoveElementSchemaBuilder = ({
  parentElements,
  prevSiblingElements,
}) => {
  const parentElement = selectFieldSchema('parentElement', 'Parent Element', {
    options: parentElements,
    allowClear: false,
  })

  const prevSibling = selectFieldSchema('prevSibling', 'Prev Sibling', {
    options: prevSiblingElements,
  })

  return {
    properties: {
      ...parentElement,
      ...prevSibling,
    },
    required: ['parentElement', 'prevSibling'],
    title: 'Update Element Input',
    type: 'object',
  } as const
}
