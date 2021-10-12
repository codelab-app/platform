import { AntdDesignApi } from '@codelab/backend/infra'

export const name = 'RecoilState'

export const interfaceFields: Array<Partial<AntdDesignApi>> = [
  {
    property: 'stateKey',
    type: 'string',
  },
  {
    property: 'defaultValue',
    type: 'string',
  },
  {
    property: 'persisted',
    type: 'string',
  },
]
