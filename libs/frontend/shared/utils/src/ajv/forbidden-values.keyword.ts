import type { FuncKeywordDefinition } from 'ajv'

const keyword = 'forbiddenValues'

export const forbiddenValuesKeyword: FuncKeywordDefinition = {
  errors: false,
  keyword,
  schema: true,
  validate: (forbiddenValues: Array<string>, data: string) => {
    return !forbiddenValues.includes(data)
  },
}
