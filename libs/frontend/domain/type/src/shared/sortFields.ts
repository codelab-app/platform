import { type IField } from '@codelab/frontend/abstract/core'

export const sortFieldsArray = (fields: Array<IField>) => {
  const compareNodes = (field1: IField, field2: IField) => {
    let node1 = field1
    let node2 = field2
    const pathA = [field1.id]
    const pathB = [field2.id]

    while (node1.prevSibling) {
      node1 = fields.find((node) => node.id === node1.prevSibling?.id) as IField
      pathA.unshift(node1.id)
    }

    while (node2.prevSibling) {
      node2 = fields.find((node) => node.id === node2.prevSibling?.id) as IField
      pathB.unshift(node2.id)
    }

    const result = pathA.join().localeCompare(pathB.join())

    return result !== 0 ? result : field1.id.localeCompare(field2.id)
  }

  return fields.sort(compareNodes)
}
