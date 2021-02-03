import { Grid } from '@codelab/tools/generators/json-schema'

@Grid<DemoInput>({
  email: {
    __grid: {
      order: 3,
      span: 24,
    },
  },
  password: {
    __grid: {
      order: 2,
      span: 24,
    },
  },
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
})
export class DemoInput {
  email = ''

  password = ''

  firstname = ''

  lastname = ''

  notGroupedField = ''
}
