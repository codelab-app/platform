import { Attribute_Bool_Exp } from '@codelab/hasura'

export const createAttributesFilter = (
  attributeSearchValue: string | undefined = '',
) => {
  const where: Attribute_Bool_Exp = {}

  if (attributeSearchValue) {
    where.key = { _ilike: `%${attributeSearchValue}%` }
  }
  return where
}
