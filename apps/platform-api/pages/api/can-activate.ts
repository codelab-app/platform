import {
  AuthGuardDomainModule,
  AuthGuardRepository,
} from '@codelab/backend/domain/auth-guard'
import { getService } from '@codelab/backend/infra/adapter/serverless'
import { IPageKind } from '@codelab/shared/abstract/core'
import { getResourceClient } from '@codelab/shared/domain/mapper'
import { tryParse } from '@codelab/shared/utils'
import { ExternalCopy, Isolate } from 'isolated-vm'
import isString from 'lodash/isString'
import type { NextApiHandler } from 'next'

const secureEval = (code: string, response: unknown) => {
  const isolate = new Isolate({ memoryLimit: 8 })
  const context = isolate.createContextSync()
  const jail = context.global
  jail.setSync('global', jail.derefInto())
  jail.setSync(
    'response',
    new ExternalCopy(response, { transferOut: true }).copyInto(),
  )

  return context.evalClosureSync(code, [], { result: { copy: true } })
}

const handler: NextApiHandler = async (req, res) => {
  const { domain, pageUrl } = req.body

  if (!isString(domain) || !isString(pageUrl)) {
    return res.status(400).json({ canActivate: false, message: 'Invalid body' })
  }

  const authGuardRepository = await getService(
    AuthGuardDomainModule,
    AuthGuardRepository,
  )

  // load auth guard
  const authGuard = await authGuardRepository.findOne({
    pages_SINGLE: {
      AND: [
        { app: { domains_SINGLE: { name: domain } } },
        { url: pageUrl },
        // system page doesn't have auth guard
        { kind: IPageKind.Regular },
      ],
    },
  })

  // either a regular page with no auth guard attached to or a system page
  if (!authGuard) {
    return res.status(200).json({ canActivate: true })
  }

  const { resource, responseTransformer } = authGuard
  const resourceConfig = tryParse(resource.config.data)
  const client = getResourceClient(resource.type, resourceConfig)
  const fetchConfig = tryParse(authGuard.config.data)

  try {
    const response = await client.fetch(fetchConfig)

    const parsedResponse = {
      data: response.data,
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    }

    const canActivate = await secureEval(responseTransformer, parsedResponse)

    return res.status(200).json({ canActivate })
  } catch (error) {
    return res.status(500).json({ canActivate: false, error })
  }
}

export default handler
