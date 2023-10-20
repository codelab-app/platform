import { type IFieldModel } from '@codelab/frontend/abstract/domain'
import sortBy from 'lodash/sortBy'

export const sortFieldsArray = (fields: Array<IFieldModel>) => {
  const nodes = new Map(fields.map((field) => [field.id, field]))

  const getPath = (field: IFieldModel) => {
    const path = [field.id]

    while (field.prevSibling) {
      field = nodes.get(field.prevSibling.id) as IFieldModel
      path.unshift(field.id)
    }

    return path.join()
  }

  return sortBy(fields, [(field) => getPath(field), 'key'])
}
