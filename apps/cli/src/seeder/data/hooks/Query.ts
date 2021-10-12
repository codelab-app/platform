import { AntdDesignApi } from '@codelab/backend/infra'

export const name = 'Query'

export const interfaceFields: Array<Partial<AntdDesignApi>> = [
  {
    property: 'queryKey',
    type: 'string',
  },
  {
    property: 'url',
    type: 'string',
  },
  {
    property: 'body',
    type: 'string',
  },
  {
    property: 'body',
    type: 'string',
  },
  {
    property: 'method',
    type: 'GET|DELETE|HEAD|OPTIONS|POST|PUT|PATCH|PURGE|LINK|UNLINK',
    isEnum: true,
  },
]
