import upsertField from './field/upsertField.cypher'
import getTypeDescendants from './getTypeDescendants.cypher'
import getTypeDescendantsOGM from './getTypeDescendantsOGM.cypher'
import getTypeReferences from './getTypeReferences.cypher'
import isTypeDescendantOf from './isTypeDescendantOf.cypher'

export {
  getTypeDescendants,
  getTypeDescendantsOGM,
  getTypeReferences,
  isTypeDescendantOf,
  upsertField,
}
