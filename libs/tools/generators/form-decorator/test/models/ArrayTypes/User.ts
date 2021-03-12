import { RjsfGrid } from '../../../src/decorators/RjsfGrid';
import { RjsfGridProp } from '../../../src/decorators/RjsfGridProp';

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
class Role {
	@RjsfGridProp({ row: 0, span: 12, order: 0, title: 'Role Type' })
	declare roleType: string

	@RjsfGridProp({ row: 0, span: 12, order: 1, title: 'Name' })
	declare name: string
}

@RjsfGrid({
	'ui:spacing': 16,
	ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class User {
	@RjsfGridProp({ row: 0, span: 12, order: 0, clazz: Role, isArray: true, title: 'Roles' })
	declare roles: Role[]
}
