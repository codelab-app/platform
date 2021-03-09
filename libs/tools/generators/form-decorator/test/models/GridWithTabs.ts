import { RjsfGrid } from '../../src/decorators/RjsfGrid';
import { RjsfGridProp } from '../../src/decorators/RjsfGridProp';
import { Tabs } from './Tabs';

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class GridWithTabs {
	@RjsfGridProp({ row: 0, span: 12, order: 1, required: true })
	declare firstName: string

	@RjsfGridProp({ row: 0, span: 12, order: 0, clazz: Tabs, title: 'Tabs Sample' })
	declare tabsSample: Tabs
}
