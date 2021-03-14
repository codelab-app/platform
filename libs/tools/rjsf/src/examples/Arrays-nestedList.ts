import { JsfProperty } from '../decorators/JsfProperty'

@JsfProperty({
  type: 'string',
  default: 'lorem ipsum',
})
export class NestedListInnerItem {}

@JsfProperty({
  type: 'array',
  title: 'Inner list',
  items: [NestedListInnerItem],
})
export class NestedListInnerList {}
