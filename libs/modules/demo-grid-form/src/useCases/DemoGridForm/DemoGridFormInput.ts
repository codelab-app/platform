import { grid } from '@codelab/tools/grid-decorator'

export class DemoGridFormInput {
  /**
   * {"order":1, "span": 12}
   * */
  @grid({ order: 1, span: 12 })
  email1 = ''

  /**
   * {"order":0, "span": 16}
   * */
  @grid({ order: 0, span: 16 })
  password0 = ''

  /**
   * {"order":2, "span": 8}
   * */
  @grid({ order: 2, span: 8 })
  name2 = ''

  notGroupedField = ''
}
