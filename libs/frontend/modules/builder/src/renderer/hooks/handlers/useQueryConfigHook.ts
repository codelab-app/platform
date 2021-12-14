/* eslint-disable react-hooks/rules-of-hooks */

import {
  IQueryConfigHookConfig,
  QueryMethod,
} from '@codelab/shared/abstract/core'
import axios, { Method } from 'axios'
import { useQuery } from 'react-query'
import { HookHandler } from '../HookHandler'

export const useQueryConfigHook: HookHandler = (
  config: IQueryConfigHookConfig,
) => {
  const { method, url, body } = config

  if (!url) {
    return
  }

  const output = useQuery(config.queryKey, (context) =>
    axios({
      data: body,
      url,
      // GraphQL Codegen is renaming enum
      method: (method ?? QueryMethod.Get).toUpperCase() as Method,
      headers: { 'Content-type': 'application/json' },
    }).then((r) => r.data),
  )

  return { queryConfigHook: output }
}
