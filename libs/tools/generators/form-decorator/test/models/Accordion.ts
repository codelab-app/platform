import { RjsfGroupProp } from '../../src/decorators/RjsfGroupProp';
import { RjsfGroup } from '../../src/decorators/RjsfGroup';

@RjsfGroup({
	ObjectFieldTemplate: 'RjsfAccordionFieldTemplate'
})
export class Accordion {
	@RjsfGroupProp({panelTitle: 'Accordion 1', order: 0})
	declare a: string

	@RjsfGroupProp({panelTitle: 'Accordion 1', order: 1})
	declare b: string

	@RjsfGroupProp({panelTitle: 'Accordion 2', order: 0})
	declare c: string
}
