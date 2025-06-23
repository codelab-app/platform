import type { NextApiRequest, NextApiResponse } from 'next'

import { getEnv } from '@codelab/shared-config-env'
import { Validator } from '@codelab/shared-infra-typebox'
import { lists, setConfig } from '@mailchimp/mailchimp_marketing'
import { Type } from '@sinclair/typebox'

const EmailSchema = Type.Object({
  email: Type.String().email(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { apiKey, listId, serverPrefix } = getEnv().mailchimp

  try {
    const { email } = Validator.parse(EmailSchema, req.body)

    setConfig({
      apiKey,
      server: serverPrefix,
    })

    const response = await lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
    })

    res.status(200).json(response)

    return
  } catch (error) {
    res.status(500).json({ error: 'invalid or already added email' })

    return
  }
}

export default handler
