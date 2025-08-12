import type { CodeKeywordDefinition, KeywordCxt } from 'ajv'

const keyword = 'clDiscriminator'

export const clDiscriminatorKeyword: CodeKeywordDefinition = {
  $data: true,
  code: (cxt: KeywordCxt) => {
    const { gen, schema } = cxt
  },
  keyword,
  post: true,
  schemaType: ['object'],
}
