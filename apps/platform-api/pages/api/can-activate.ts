import {
  AuthGuardDomainModule,
  AuthGuardRepository,
} from '@codelab/backend/domain/auth-guard'
import { IPageKind } from '@codelab/shared/abstract/core'
import { getResourceClient } from '@codelab/shared/domain/mapper'
import { tryParse } from '@codelab/shared/utils'
import { NestFactory } from '@nestjs/core'
import { ExternalCopy, Isolate } from 'isolated-vm'
import isString from 'lodash/isString'
import type { NextApiHandler } from 'next'

const secureEval = (code: string, response: unknown) => {
  const isolate = new Isolate({ memoryLimit: 8 })
  const context = isolate.createContextSync()
  const jail = context.global
  jail.setSync('global', jail.derefInto())
  jail.setSync('response', new ExternalCopy(response).copyInto())

  return context.evalClosureSync(code, [], { result: { copy: true } })
}

const handler: NextApiHandler = async (req, res) => {
  const { domain, pageUrl } = req.body

  if (!isString(domain) || !isString(pageUrl)) {
    return res.status(400).json({ canActivate: false, message: 'Invalid body' })
  }

  const appContext = await NestFactory.createApplicationContext(
    AuthGuardDomainModule,
  )

  const authGuardRepository = appContext.get(AuthGuardRepository)

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
  const { config, type } = resource
  const client = getResourceClient(type, tryParse(config.data))
  const response = await client.fetch(tryParse(authGuard.config.data))
  const canActivate = await secureEval(responseTransformer, response)

  res.status(200).json({ canActivate })
}

export default handler
