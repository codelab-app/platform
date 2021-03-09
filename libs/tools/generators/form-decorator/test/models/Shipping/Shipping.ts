import { RjsfGrid } from '../../../main/decorators/RjsfGrid';
import { RjsfGridProp } from '../../../main/decorators/RjsfGridProp';

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class Shipping {
	@RjsfGridProp({ row: 0, span: 12, order: 0, title: 'First Name' })
	declare firstName: string

	@RjsfGridProp({ row: 0, span: 12, order: 1, title: 'Last Name' })
	declare lastName: string

	@RjsfGridProp({ row: 1, span: 24, title: 'Address', type: 'array' })
	declare address: string

	@RjsfGridProp({ row: 2, span: 12, title: 'City' })
	declare city: string

	@RjsfGridProp({ row: 2, span: 6, title: 'Province', enum: ['Ontario', 'Alberta'] })
	declare province: string

	@RjsfGridProp({ row: 2, span: 6, title: 'Postal Code' })
	declare postalCode: string

	@RjsfGridProp({ row: 3, span: 12, title: 'Phone Number' })
	declare phoneNumber: string
}
