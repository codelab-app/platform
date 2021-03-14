import { RjsfProperty } from '../decorators/RjsfProperty'

@RjsfProperty({
  type: 'string',
  default: 'lorem ipsum',
})
export class NestedListInnerItem {}

@RjsfProperty({
  type: 'array',
  title: 'Inner list',
  items: [NestedListInnerItem],
})
export class NestedListInnerList {}
