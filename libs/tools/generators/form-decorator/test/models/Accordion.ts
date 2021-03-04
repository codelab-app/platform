import { RjsfGroup } from '../../src/decorators/RjsfGroup'
import { RjsfGroupProp } from '../../src/decorators/RjsfGroupProp'

@RjsfGroup({
  ObjectFieldTemplate: 'RjsfAccordionFieldTemplate',
})
export class Accordion {
  @RjsfGroupProp({ panelTitle: 'Accordion 1', order: 0 })
  declare a: string

  @RjsfGroupProp({ panelTitle: 'Accordion 1', order: 1 })
  declare b: string

  @RjsfGroupProp({ panelTitle: 'Accordion 2', order: 2 })
  declare c: string
}
