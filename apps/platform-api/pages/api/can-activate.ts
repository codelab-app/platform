import {
  RedirectDomainModule,
  RedirectRepository,
} from '@codelab/backend/domain/redirect'
import { getService } from '@codelab/backend/infra/adapter/serverless'
import { evaluateObject } from '@codelab/frontend/shared/utils'
import type { IResourceFetchConfig } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { getResourceClient } from '@codelab/shared/domain/mapper'
import { tryParse } from '@codelab/shared/utils'
import { ExternalCopy, Isolate } from 'isolated-vm'
import isString from 'lodash/isString'
import type { NextApiHandler } from 'next'

const safeEval = (code: string, response: object) => {
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
  const { authorization, domain, pageUrl } = req.body

  const toJson = (status: number, canActivate: boolean, message?: string) =>
    res.status(status).json({ canActivate, message })

  if (!isString(domain) || !isString(pageUrl)) {
    return toJson(400, false, 'Invalid body')
  }

  const redirectRepository = await getService(
    RedirectDomainModule,
    RedirectRepository,
  )

  const redirect = await redirectRepository.findOne({
    source: {
      AND: [
        { app: { domains_SINGLE: { name: domain } } },
        { url: pageUrl },
        // system page doesn't have auth guard
        { kind: IPageKind.Regular },
      ],
    },
  })

  // either a regular page with no redirect attached to or a system page
  if (!redirect) {
    return toJson(200, true)
  }

  // there is an auth guard to protect the page but not authorization is provided
  // no benefit from running auth guard without user specific info
  if (!authorization) {
    return toJson(200, false, 'Messing authorization in request body')
  }

  const { config, resource, responseTransformer } = redirect.authGuard
  const resourceConfig = tryParse(resource.config.data)
  const client = getResourceClient(resource.type, resourceConfig)
  const fetchConfig = tryParse(config.data)

  const evaluatedConfig = evaluateObject(fetchConfig, {
    cookie: authorization,
  }) as IResourceFetchConfig

  let response

  try {
    response = await client.fetch(evaluatedConfig)
  } catch (error) {
    console.log(error)

    return toJson(500, false, `Failed to request "${resource.name}" resource`)
  }

  try {
    const canActivate = await safeEval(responseTransformer, response)

    return toJson(200, canActivate)
  } catch (error) {
    return toJson(500, false, `Unable to transform response`)
  }
}

export default handler
