import { grid } from '@codelab/tools/generators/json-schema'

export class DemoGridFormInput {
  @grid({ order: 1, span: 12 })
  email1 = ''

  @grid({ order: 0, span: 16 })
  password0 = ''

  @grid({ order: 2, span: 8 })
  name2 = ''

  notGroupedField = ''
}
