import {
  RedirectDomainModule,
  RedirectRepository,
} from '@codelab/backend/domain/redirect'
import { getService } from '@codelab/backend/infra/adapter/serverless'
import { evaluateObject } from '@codelab/frontend/shared/utils'
import type { IResourceFetchConfig } from '@codelab/shared/abstract/core'
import { IPageKind, IRedirectTargetType } from '@codelab/shared/abstract/core'
import { getResourceClient } from '@codelab/shared/domain/mapper'
import { tryParse } from '@codelab/shared/utils'
import { ExternalCopy, Isolate } from 'isolated-vm'
import isString from 'lodash/isString'
import type { NextApiHandler } from 'next'
import { URL } from 'url'

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

  const toJson = ({
    canActivate,
    status,
    message,
    redirectUrl,
  }: {
    status: number
    canActivate: boolean
    message?: string
    redirectUrl?: string
  }) => res.status(status).json({ canActivate, message, redirectUrl })

  if (!isString(domain) || !isString(pageUrl)) {
    return toJson({
      status: 400,
      canActivate: false,
      message: 'Invalid body',
    })
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
    return toJson({ status: 200, canActivate: true })
  }

  const redirectUrl =
    redirect.targetType === IRedirectTargetType.Page && redirect.targetPage?.url
      ? new URL(redirect.targetPage?.url, domain).toString()
      : (redirect.targetUrl as string)

  // there is an auth guard to protect the page but not authorization is provided
  // no benefit from running auth guard without user specific info
  if (!authorization) {
    return toJson({
      status: 200,
      canActivate: false,
      message: 'Messing authorization in request body',
      redirectUrl,
    })
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

    return toJson({
      status: 500,
      canActivate: false,
      message: `Failed to request "${resource.name}" resource`,
      redirectUrl,
    })
  }

  try {
    const canActivate = await safeEval(responseTransformer, response)

    return toJson({
      status: 200,
      canActivate,
      message: undefined,
      redirectUrl: !canActivate ? redirectUrl : undefined,
    })
  } catch (error) {
    return toJson({
      status: 500,
      canActivate: false,
      message: `Unable to transform response`,
      redirectUrl,
    })
  }
}

export default handler
