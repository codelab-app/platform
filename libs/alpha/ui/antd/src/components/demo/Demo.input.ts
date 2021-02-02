import { Grid } from '@codelab/tools/generators/json-schema'

export class DemoInput {
  @Grid({ order: 3, span: 24 })
  email = ''

  @Grid({ order: 2, span: 24 })
  password = ''

  @Grid({ order: 0, span: 12 })
  firstname = ''

  @Grid({ order: 1, span: 12 })
  lastname = ''

  notGroupedField = ''
}
