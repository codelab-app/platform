import { Grid } from '@codelab/tools/generators/json-schema'

export class DemoGridFormInput {
  @Grid({ order: 1, span: 12 })
  email1 = ''

  @Grid({ order: 0, span: 16 })
  password0 = ''

  @Grid({ order: 2, span: 8 })
  name2 = ''

  notGroupedField = ''
}
