import { RjsfGrid } from '../../../main/decorators/RjsfGrid';
import { RjsfGridProp } from '../../../main/decorators/RjsfGridProp';

class ReactNode {}

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class CardProps {
	@RjsfGridProp({
		title: 'Actions',
		description: 'The action list, shows at the bottom of the Card',
		type: 'string',
		isArray: true,
		row: 0,
		span: 6,
	})
	declare actions?: Array<ReactNode>
}
