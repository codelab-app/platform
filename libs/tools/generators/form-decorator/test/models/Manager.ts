import { RjsfGrid } from '../../src/decorators/RjsfGrid'
import { RjsfGridProp } from '../../src/decorators/RjsfGridProp'
import { Project } from './Project'

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate',
})
export class Manager {
  @RjsfGridProp({ row: 0, span: 6, order: 0 })
  declare firstName: string

  @RjsfGridProp({ row: 0, span: 6, order: 1 })
  declare lastName: string

  @RjsfGridProp({ row: 1, span: 24, clazz: Project })
  declare project: Project
}
