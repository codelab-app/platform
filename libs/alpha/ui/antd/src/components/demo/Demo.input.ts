import { Property } from '@tsed/schema'
import { Grid, Tabs } from '@codelab/tools/generators/json-schema'

@Grid<DemoGridProps>({
  // name: {
  //   __grid: {
  //     order: 0,
  //     span: 12,
  //   },
  //   firstname: {
  //     __grid: {
  //       order: 0,
  //       span: 12,
  //     },
  //   },
  //   lastname: {
  //     __grid: {
  //       order: 1,
  //       span: 12,
  //     },
  //   },
  // },
  firstname: {
    __grid: {
      order: 0,
      span: 12,
    },
  },
  lastname: {
    __grid: {
      order: 1,
      span: 12,
    },
  },
  email: {
    __grid: {
      order: 2,
      span: 16,
    },
  },
  password: {
    __grid: {
      order: 3,
      span: 8,
    },
  },
})
export class DemoGridProps {
  @Property()
  declare email: string

  @Property()
  declare password: string

  @Property()
  declare firstname: string

  @Property()
  declare lastname: string

  // @Property()
  // declare name: {
  //   firstname: string
  //   lastname: string
  // }

  @Property()
  declare notGroupedField: string
}

@Tabs<DemoTabsProps>({
  'ui:groups': [
    'firstname',
    'lastname',
    {
      groups: { password: ['password'], contacts: ['email'] },
      'ui:template': 'tabs',
    },
  ],
})
export class DemoTabsProps {
  @Property()
  declare email: string

  @Property()
  declare password: string

  @Property()
  declare firstname: string

  @Property()
  declare lastname: string

  @Property()
  declare notGroupedField: string
}
