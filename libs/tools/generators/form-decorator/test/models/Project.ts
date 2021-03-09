import { Task } from './Task';
import { RjsfGrid } from '../../src/decorators/RjsfGrid';
import { RjsfGridProp } from '../../src/decorators/RjsfGridProp';

@RjsfGrid({
	'ui:spacing': 10,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class Project {
	@RjsfGridProp({ row: 0, span: 6, order: 0 })
	declare name: string

	@RjsfGridProp({ row: 0, span: 6, order: 1 })
	declare description: string

	@RjsfGridProp({row: 1, span: 24, clazz: Task})
	declare task: Task
}
