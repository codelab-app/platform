import {
  AuthGuardDomainModule,
  AuthGuardRepository,
} from '@codelab/backend/domain/auth-guard'
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

  if (!isString(domain) || !isString(pageUrl) || authorization) {
    return toJson(400, false, 'Invalid body')
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
    return toJson(200, true)
  }

  const { resource, responseTransformer } = authGuard
  const resourceConfig = tryParse(resource.config.data)
  const client = getResourceClient(resource.type, resourceConfig)
  const fetchConfig = tryParse(authGuard.config.data)

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
