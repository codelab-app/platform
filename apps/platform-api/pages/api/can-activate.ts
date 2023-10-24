import { PageDomainModule, PageRepository } from '@codelab/backend/domain/page'
import { getService } from '@codelab/backend/infra/adapter/serverless'
import { evaluateObject } from '@codelab/frontend/shared/utils'
import type { IResourceFetchConfig } from '@codelab/shared/abstract/core'
import { IPageKind, IRedirectKind } from '@codelab/shared/abstract/core'
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

  const toJson = (
    status: number,
    canActivate: boolean,
    message?: string,
    redirect?: string,
  ) => res.status(status).json({ canActivate, message, redirect })

  if (!isString(domain) || !isString(pageUrl)) {
    return toJson(400, false, 'Invalid body')
  }

  const pageRepository = await getService(PageDomainModule, PageRepository)

  // load auth guard
  const page = await pageRepository.findOne({
    AND: [
      { app: { domains_SINGLE: { name: domain } } },
      { url: pageUrl },
      // system page doesn't have auth guard
      { kind: IPageKind.Regular },
    ],
  })

  // either a regular page with no auth guard attached to or a system page
  if (!page?.authGuard) {
    return toJson(200, true)
  }

  // there is an auth guard to protect the page but not authorization is provided
  // no benefit from running auth guard without user specific info
  if (!authorization) {
    return toJson(200, false, 'Messing authorization in request body')
  }

  const { resource, responseTransformer } = page.authGuard.authGuard
  const resourceConfig = tryParse(resource.config.data)
  const client = getResourceClient(resource.type, resourceConfig)
  const fetchConfig = tryParse(page.authGuard.authGuard.config.data)

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

    if (!canActivate) {
      const { redirect } = page.authGuard
      let url

      if (redirect.__typename === IRedirectKind.PageRedirect) {
        url = `${domain}${redirect.page.url}`
      }

      if (redirect.__typename === IRedirectKind.UrlRedirect) {
        url = redirect.url
      }

      return toJson(200, canActivate, 'Unauthorized access', url)
    }

    return toJson(200, true)
  } catch (error) {
    return toJson(500, false, `Unable to transform response`)
  }
}

export default handler
