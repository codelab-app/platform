import { type IField } from '@codelab/frontend/abstract/core'
import sortBy from 'lodash/sortBy'

export const sortFieldsArray = (fields: Array<IField>) => {
  const nodes = new Map(fields.map((field) => [field.id, field]))

  const getPath = (field: IField) => {
    const path = [field.id]

    while (field.prevSibling) {
      field = nodes.get(field.prevSibling.id) as IField
      path.unshift(field.id)
    }

    return path.join()
  }

  return sortBy(fields, [(field) => getPath(field), 'id'])
}
