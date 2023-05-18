export const fieldSelectionSet = `{
  id
  key
  name
  description
  validationRules
  defaultValues
  prevSibling {
    id
  }
  nextSibling {
    id
  }
  fieldType {
    __typename
    id
    kind
    name
  }
  api {
    id
  }
}`

export const exportFieldSelectionSet = `{
  id
  key
  name
  description
  validationRules
  defaultValues
  fieldType {
    __typename
    id
    kind
    name
  }
  api {
    id
  }
}`
