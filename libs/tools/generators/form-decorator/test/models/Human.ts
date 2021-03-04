import { RjsfGrid } from '../../src/decorators/RjsfGrid'
import { RjsfGridProp } from '../../src/decorators/RjsfGridProp'

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate',
})
export class Human {
  @RjsfGridProp({ row: 0, span: 6, order: 1 })
  declare firstName: string

  @RjsfGridProp({ row: 0, span: 8, order: 0 })
  declare lastName: string
}
