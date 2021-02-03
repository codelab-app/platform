import { Grid } from '@codelab/tools/generators/json-schema'

@Grid<DemoGridFormInput>({
  email1: {
    __grid: {
      order: 1,
      span: 12,
    },
  },
  password0: {
    __grid: {
      order: 1,
      span: 16,
    },
  },
  name2: {
    __grid: {
      order: 2,
      span: 8,
    },
  },
  nestedFields: {
    __grid: {
      order: 0,
      span: 12,
    },
    firstNested: {
      __grid: {
        order: 0,
        span: 12,
      },
    },
    secondNested: {
      __grid: {
        order: 1,
        span: 12,
      },
    },
  },
})
export class DemoGridFormInput {
  email1 = ''

  password0 = ''

  name2 = ''

  nestedFields = {
    secondNested: '',
    firstNested: '',
  }

  notGroupedField = ''
}
