import { getAuthGuardRepository } from '@codelab/backend/infra/adapter/serverless'
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
  jail.setSync('response', new ExternalCopy(response).copyInto())

  return context.evalClosureSync(code, [], { result: { copy: true } })
}

const handler: NextApiHandler = async (req, res) => {
  const { domain, pageUrl } = req.body

  if (!domain || !isString(domain) || !pageUrl || !isString(pageUrl)) {
    return res.status(400).json({ canActivate: false, message: 'Invalid body' })
  }

  // load auth guard
  const authGuardRepository = await getAuthGuardRepository(req)

  const authGuard = await authGuardRepository.findOne({
    pages_SINGLE: {
      AND: [{ app: { domains_SINGLE: { name: domain } } }, { url: pageUrl }],
    },
  })

  if (!authGuard) {
    return res
      .status(500)
      .json({ canActivate: false, message: 'Unable to find auth guard' })
  }

  const { resource, responseTransformer } = authGuard
  const { config, type } = resource
  const client = getResourceClient(type, tryParse(config.data))
  const response = await client.fetch(tryParse(authGuard.config.data))
  const canActivate = await secureEval(responseTransformer, response)

  res.status(200).json({ canActivate })
}

export default handler
